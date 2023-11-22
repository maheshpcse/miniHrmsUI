import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as _ from 'underscore';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { AdminSidebarService } from 'src/app/api-services/admin-sidebar.service';
import { AdminEmployeesService } from 'src/app/api-services/admin-employees.service';
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
	// public pages: any = ['<<','<',1,2,3,'>','>>'];
	public pages: any = [];
    public pageSet: any = {};
    public pageCount: any = -1;
	public currentPage: any = 1;
	public viewItem: any = {};

    constructor(
        public adminSidebarService: AdminSidebarService,
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
		public adminEmployeesService: AdminEmployeesService,
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

	addClassToPage(page?: any, id?: any) {
		let classObj: any = {
			'active': page == this.currentPage,
			'mr-3': id == 0, 'mr-5': id == 1,
			'mr-2': (page >= 1 && page < this.getPage() && page != '>' && page != '>>'),
			'ml-5': page == '>', 'ml-3': page == '>>',
			'disabled': ((this.currentPage == 1 && (page == '<' || page == '<<'))
				|| (this.currentPage == this.loginHistoryDataCount && (page == '>' || page == '>>')))
		}
		return classObj;
	}

    getPage(page?: any) {
		return this.pages[this.pages.indexOf('>') - 1];
	}

	getAllPages() {
		// this.pages = ['<<','<',1,2,3,'>','>>'];
		this.pages = ['<<','<'];

		let allPages = [];
		for (let i = 1; i <= this.loginHistoryDataCount; i += 1) {
			allPages.push(i);
		}
		// console.log('allPages isss:', allPages);

		let chunksData: any = [];
		for (let i = 0; i <= this.loginHistoryDataCount; i += 5) {
			let chunk: any = allPages.slice(i, i + 5);
			chunksData.push(chunk);
            this.pageSet[i] = chunk;
		}
		// chunksData = _.chunk(allPages, 5);
		// console.log('chunksData isss:', chunksData);
        console.log('pageSet isss:', this.pageSet);

		for (let i = 0; i < chunksData[0].length; i += 1) {
			// this.pages.push(i + 1);
			this.pages.push(chunksData[0][i]);
		}
		this.pages.push('>');
		this.pages.push('>>');
		// console.log('this.pages isss:', this.pages);
		this.setAllPages(-1);
	}

	setAllPages(page?: any) {
		console.log('page isss:', page);
		// this.currentPage = page;
        if (['<<', '<', '>', '>>', -1].includes(page)) {
            if (page == '>' || page == -1) {
				this.pageCount += 1;
				this.currentPage = this.pageCount + 1;
				if (this.pageSet.hasOwnProperty(this.pageCount)) {
					this.pages.pop();
					this.pages.pop();
					for (let i = 2; i < this.pages.length; i += 1) {
						this.pages.pop();
					}
					if (this.pageSet[this.pageCount]) {
						let id: any = 2;
						for (const data of this.pageSet[this.pageCount]) {
							this.pages[id] = data;
							id += 1;
						}
						this.pages.push('>');
						this.pages.push('>>');
					}
				} else {
					this.currentPage = this.pageCount + 1;
				}
			} else if (page == '<') {
				this.pageCount -= 1;
				this.currentPage = this.pageCount + 1;
				if (this.pageSet.hasOwnProperty(this.currentPage)) {
					this.pages.pop();
					this.pages.pop();
					for (let i = 2; i < this.pages.length; i += 1) {
						this.pages.pop();
					}
					if (this.pageSet[this.currentPage - 5]) {
						let id: any = 2;
						for (const data of this.pageSet[this.currentPage - 5]) {
							this.pages[id] = data;
							id += 1;
						}
						this.pages.push('>');
						this.pages.push('>>');
					}
				} else {
					this.currentPage = this.pageCount + 1;
				}
			} else if (page == '<<') {
				this.pageCount = 0;
				this.currentPage = 1;
				this.pages.pop();
				this.pages.pop();
				for (let i = 2; i < this.pages.length; i += 1) {
					this.pages.pop();
				}
				let id: any = 2;
				for (const data of this.pageSet[0]) {
					this.pages[id] = data;
					id += 1;
				}
				this.pages.push('>');
				this.pages.push('>>');
			} else if (page == '>>') {
				this.pageCount = this.loginHistoryDataCount - 1;
				this.currentPage = this.loginHistoryDataCount;
				this.pages.pop();
				this.pages.pop();
				for (let i = 2; i < this.pages.length; i += 1) {
					this.pages.pop();
				}
				let lastPageArr: any = Object.keys(this.pageSet);
				let id: any = 2;
				for (const data of this.pageSet[lastPageArr[lastPageArr.length - 1]]) {
					this.pages[id] = data;
					id += 1;
				}
				this.pages.push('>');
				this.pages.push('>>');
			}
        } else {
            this.currentPage = page;
            this.pageCount = page - 1;
        }
        console.log('pageCount isss:', this.pageCount);
        console.log('currentPage isss:', this.currentPage);
		if (this.pageCount != -1) {
			this.getLoginHistoryDetails();
		}
	}

	setPage(page?: any) {
		this.setAllPages(page);
	}

	getLoginHistoryDetails() {
		this.spinner = true;
		const searchPayload = {
			limit: 10,
			offset: Number(this.currentPage)
		}
		console.log('Get searchPayload isss:', searchPayload);

		this.adminEmployeesService.getLoginHistoryData(searchPayload).subscribe(async (response: any) => {
            console.log('Get login history data response isss:', response);
            if (response && response.success) {
				this.loginHistoryDataList = response.data['list'];
				this.loginHistoryDataCount = response.data['count'];
				if(this.pageCount == -1) {
					this.getAllPages();
				}
            } else {
                this.getAlertMessage('error', response.message);
            }
			this.spinner = false;
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
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

	getAlertMessage(status?: any, message?: any) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            showCloseButton: true
        });
        Toast.fire({
            icon: status,
            title: message
        });
    }

}
