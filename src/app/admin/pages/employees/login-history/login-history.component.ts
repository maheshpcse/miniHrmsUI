import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as _ from 'underscore';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { AdminSidebarService } from 'src/app/api-services/admin-sidebar.service';
import { AdminEmployeesService } from 'src/app/api-services/admin-employees.service';
import { SharedService } from 'src/app/api-services/shared.service';
declare var $: any;

@Component({
    selector: 'app-login-history',
    templateUrl: './login-history.component.html',
    styleUrls: ['./login-history.component.css']
})
export class LoginHistoryComponent implements OnInit {

	public spinner: any = false;

    public loginHistoryDataList: any = [];
	public loginHistoryDataCount: any = 0;
	public limit: any = 10;
	public currentPage: any = 1;
	public pages: any = [];
    public pageSet: any = {};
    public pageCount: any = -1;
	public pageSetCount: any = 0;
	public viewItem: any = {};

    constructor(
        public adminSidebarService: AdminSidebarService,
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
		public adminEmployeesService: AdminEmployeesService,
		public sharedService: SharedService,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        $(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});
		this.getLoginHistoryDetails();
    }

    getSideBarState() {
        return this.adminSidebarService.getSidebarState();
    }

    getPage(page?: any) {
		return this.pages[this.pages.indexOf('>') - 1];
	}

	setPage(page?: any) {
		this.setAllPages(page);
	}

	getAllPages(page?: any) {
		let { pages, pageSet, pageSetCount }: any = this.sharedService.getAllPages(this.loginHistoryDataCount, page);
		console.log('pages isss:', pages);
		console.log('pageSet isss:', pageSet);
		console.log('pageSetCount isss:', pageSetCount);
		this.pages = pages;
		this.pageSet = pageSet;
		this.pageSetCount = pageSetCount;
		this.setAllPages(-1);
	}

	setAllPages(page?: any) {
		console.log('page isss:', page);
		let { pageCount, currentPage }: any = this.sharedService.setAllPages(page);
		console.log('pageCount isss:', pageCount);
        console.log('currentPage isss:', currentPage);
		this.pageCount = pageCount;
		this.currentPage = currentPage;
		if (page != -1) {
			this.getLoginHistoryDetails();
		}
	}

	getLoginHistoryDetails() {
		this.spinner = true;
		const searchPayload = {
			limit: Number(this.limit),
			offset: Number(this.currentPage)
		}
		console.log('Get login history data searchPayload isss:', searchPayload);

		this.adminEmployeesService.getLoginHistoryData(searchPayload).subscribe(async (response: any) => {
            console.log('Get login history data response isss:', response);
            if (response && response.success) {
				this.loginHistoryDataList = response.data['list'];
				this.loginHistoryDataCount = response.data['count'];
				if(this.pageCount == -1) {
					this.getAllPages(-1);
				}
            } else {
                this.sharedService.getAlertMessage('error', response.message);
				this.loginHistoryDataList = [];
            }
			this.spinner = false;
        }, (error: any) => {
            this.sharedService.getAlertMessage('warning', 'Network failed, Please try again.');
			this.spinner = false;
        });
	}

	onEditItem(item?: any, type?: any) {
		console.log('selected item isss:', item);
		let rowItem: any = item ? Object.assign(item, {}) : {};
		if (type == 'view') {
			this.viewItem = rowItem;
			$("#viewItemModal").modal('show');
		}
	}

	resetEditItem() {
		this.viewItem = {};
	}

}
