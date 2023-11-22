import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as _ from 'underscore';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { AdminSidebarService } from 'src/app/api-services/admin-sidebar.service';
import { AdminFormsService } from 'src/app/api-services/admin-forms.service';
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
	public pages: any = ['<<','<',1,2,3,'>','>>'];
	public currentPage: any = 1;
	public viewItem: any = {};

	constructor(
		public adminSidebarService: AdminSidebarService,
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
		public adminFormsService: AdminFormsService,
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
	}

	getPage(page?: any) {
		return this.pages[this.pages.indexOf('>') - 1];
	}

	getAllPages() {
		// this.pages = ['<<','<',1,2,3,'>','>>'];
		this.pages = ['<<','<'];

		let allPages = [];
		for (let i = 0; i < this.loginEncryptDataCount; i += 1) {
			allPages.push(i);
		}
		// console.log('allPages isss:', allPages);

		let chunksData: any = [];
		for (let i = 0; i < this.loginEncryptDataCount; i += 10) {
			let chunk: any = allPages.slice(i, i + 10);
			chunksData.push(chunk);
		}
		// chunksData = _.chunk(allPages, 10);
		// console.log('chunksData isss:', chunksData);

		for (let i = 0; i < chunksData.length; i += 1) {
			this.pages.push(i + 1);
		}
		this.pages.push('>');
		this.pages.push('>>');
		// console.log('this.pages isss:', this.pages);
		this.setPage(1);
	}

	setPage(page?: any) {
		console.log('page isss:', page);
		this.currentPage = page;
	}

	resetPage() {
		this.pageType = 'table';
		this.loginEncryptDataList = [];
		this.loginEncryptDataCount = 0;
		this.pages = [];
		this.getLoginEncryptDetails();
	}

	getLoginEncryptDetails() {
		this.spinner = true;
		this.adminFormsService.getLoginEncryptData({}).subscribe(async (response: any) => {
            console.log('Get login encrypt data response isss:', response);
            if (response && response.success) {
				this.loginEncryptDataList = response.data['list'];
				this.loginEncryptDataCount = response.data['count'];
				this.getAllPages();
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
                this.getAlertMessage('success', response.message);
				this.resetForm();
				this.resetPage();
            } else {
                this.getAlertMessage('error', response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
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
                this.getAlertMessage('success', response.message);
				$("#changeItemStatusModal").modal('hide');
				this.resetEditItem();
				this.getLoginEncryptDetails();
            } else {
                this.getAlertMessage('error', response.message);
            }
            this.statusSpinner = false;
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
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
