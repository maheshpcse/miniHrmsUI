import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as _ from 'underscore';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { AdminSidebarService } from 'src/app/api-services/admin-sidebar.service';
import { AdminFormsService } from 'src/app/api-services/admin-forms.service';
import { SharedService } from 'src/app/api-services/shared.service';
declare var $: any;

@Component({
	selector: 'app-login-encrypt-decrypt',
	templateUrl: './login-encrypt-decrypt.component.html',
	styleUrls: ['./login-encrypt-decrypt.component.css']
})
export class LoginEncryptDecryptComponent implements OnInit {

	@ViewChild('loginEncryptForm', { static: false }) loginEncryptFormRef: NgForm;
	public loginEncDecDetailId: any = null;
	public loginType: any = null;
	public encryptKey: any = null;
	public encryptType: any = null;
	public spinner: any = false;
	public statusSpinner: any = false;

	public pageType: any = 'table';
	public loginEncryptDataList: any = [];
	public loginEncryptDataCount: any = 0;
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
		public adminFormsService: AdminFormsService,
        public sharedService: SharedService,
        public toastr: ToastrManager
	) { }

	ngOnInit(): void {
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});
		this.getLoginEncryptDetails();
	}

    getSideBarState() {
        return this.adminSidebarService.getSidebarState();
    }

	changePageType(view?: any) {
		this.pageType = view;
		this.resetForm();
		if (view == 'table') {
			this.resetPage();
		}
	}

	getPage(page?: any) {
		return this.pages[this.pages.indexOf('>') - 1];
	}

	setPage(page?: any) {
		this.setAllPages(page);
	}

	getAllPages() {
		let { pages, pageSet, pageSetCount }: any = this.sharedService.getAllPages(this.loginEncryptDataCount);
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
			this.getLoginEncryptDetails();
		}
	}

	resetPage() {
		this.pageType = 'table';
		// this.loginEncryptDataList = [];
		// this.loginEncryptDataCount = 0;
		// this.pages = [];
		// this.pageSet = {};
		// this.pageCount = -1;
		// this.pageSetCount = 0;
		// this.currentPage = 1;
		this.getLoginEncryptDetails();
	}

	getLoginEncryptDetails() {
		this.spinner = true;
		const searchPayload = {
			limit: Number(this.limit),
			offset: Number(this.currentPage)
		}
		console.log('Get login encrypt data searchPayload isss:', searchPayload);

		this.adminFormsService.getLoginEncryptData(searchPayload).subscribe(async (response: any) => {
            console.log('Get login encrypt data response isss:', response);
            if (response && response.success) {
				this.loginEncryptDataList = response.data['list'];
				this.loginEncryptDataCount = response.data['count'];
				if(this.pageCount == -1) {
					this.getAllPages();
				}
            } else {
                this.sharedService.getAlertMessage('error', response.message);
				this.loginEncryptDataList = [];
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
		} else if (type == 'edit') {
			this.pageType = 'form';
			this.loginEncDecDetailId = rowItem['loginEncDecDetailId'];
			this.loginType = rowItem['loginType'].toString();
			this.encryptKey = rowItem['encryptKey'];
			this.encryptType = rowItem['encryptType'];
		} else if (type == 'change') {
			this.viewItem = rowItem;
			$("#changeItemStatusModal").modal('show');
		}
	}

	resetEditItem() {
		this.viewItem = {};
		this.loginEncDecDetailId = null;
		this.loginType = null;
		this.encryptKey = null;
		this.encryptType = null;
	}

	saveLoginEncryptForm() {
		this.spinner = true;

		if (this.setFormValidation()) {
			this.spinner = false;
            return this.toastr.errorToastr('Please fill the required fields.');
		}

		const loginEncryptPayload = {
			loginEncDecDetailId: this.loginEncDecDetailId || null,
			loginType: Number(this.loginType),
			encryptKey: this.encryptKey,
			encryptType: this.encryptType,
			createdBy: Number(this.authAdminService.getLoginId())
		}
		console.log('Get loginEncryptPayload data isss:', loginEncryptPayload);

		this.adminFormsService.saveLoginEncryptData(loginEncryptPayload).subscribe(async (response: any) => {
            console.log('Get saved login encrypt data response isss:', response);
            if (response && response.success) {
                this.sharedService.getAlertMessage('success', response.message);
				this.resetForm();
				this.resetPage();
            } else {
                this.sharedService.getAlertMessage('error', response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.sharedService.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
        });
	}

	changeLoginEncryptDataStatus() {
		this.statusSpinner = true;

		const loginEncryptStatusPayload = {
			loginEncDecDetailId: this.viewItem['loginEncDecDetailId'],
			status: this.viewItem['status'] == 1 ? 0 : 1
		}
		console.log('Get loginEncryptStatusPayload data isss:', loginEncryptStatusPayload);

		this.adminFormsService.updateLoginEncryptDataStatus(loginEncryptStatusPayload).subscribe(async (response: any) => {
            console.log('Get updated login encrypt data status response isss:', response);
            if (response && response.success) {
                this.sharedService.getAlertMessage('success', response.message);
				$("#changeItemStatusModal").modal('hide');
				this.resetEditItem();
				this.getLoginEncryptDetails();
            } else {
                this.sharedService.getAlertMessage('error', response.message);
            }
            this.statusSpinner = false;
        }, (error: any) => {
            this.sharedService.getAlertMessage('warning', 'Network failed, Please try again.');
            this.statusSpinner = false;
        });
	}

	setFormValidation() {
		return !this.loginType || !this.encryptKey || !this.encryptType ? true : false;
	}

	resetForm() {
		if (this.loginEncryptFormRef) {
			this.loginEncryptFormRef.reset();
		}
		this.viewItem = {};
		this.loginEncDecDetailId = null;
		this.loginType = null;
		this.encryptKey = null;
		this.encryptType = null;
	}

}
