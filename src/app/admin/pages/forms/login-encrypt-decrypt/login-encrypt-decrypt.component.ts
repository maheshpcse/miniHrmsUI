import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { AdminSidebarService } from 'src/app/api-services/admin-sidebar.service';
import { AdminFormsService } from 'src/app/api-services/admin-forms.service';

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

	public pageType: any = 'table';

	constructor(
		public adminSidebarService: AdminSidebarService,
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
		public adminFormsService: AdminFormsService,
        public toastr: ToastrManager
	) { }

	ngOnInit(): void {
	}

    getSideBarState() {
        return this.adminSidebarService.getSidebarState();
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
            console.log('Get login encrypt data response isss:', response);
            if (response && response.success) {
                this.getAlertMessage('success', response.message);
				this.resetForm();
            } else {
                this.getAlertMessage('error', response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
        });
	}

	setFormValidation() {
		return !this.loginType || !this.encryptKey || !this.encryptType ? true : false;
	}

	resetForm() {
		if (this.loginEncryptFormRef) {
			this.loginEncryptFormRef.reset();
		}
		this.loginType = null;
		this.encryptKey = null;
		this.encryptType = null;
	}

	getAlertMessage(status?: any, message?: any) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showCloseButton: true
        });
        Toast.fire({
            icon: status,
            title: message
        });
    }

}
