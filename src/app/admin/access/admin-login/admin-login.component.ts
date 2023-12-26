import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { SharedService } from 'src/app/api-services/shared.service';

@Component({
	selector: 'app-admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.css'],
	// encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {

	@ViewChild('loginForm', { static: false }) loginFormRef: NgForm;
	public adminLoginName: any = 'adminmahesh';
	public adminPassword: any = '1234';
	public spinner: any = false;

	constructor(
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public sharedService: SharedService,
        public toastr: ToastrManager
	) { }

	ngOnInit(): void {
	}

	getAdminLogin() {
		this.spinner = true;

		if (this.setFormValidation()) {
			this.spinner = false;
            return this.toastr.errorToastr('Please fill the required fields.');
		}

		const adminLoginPayload = {
			adminLoginName: this.adminLoginName,
			adminPassword: this.adminPassword
		}
		console.log('Get adminLoginPayload data isss:', adminLoginPayload);

		this.authAdminService.adminLogin(adminLoginPayload).subscribe(async (response: any) => {
            console.log('Get admin login data response isss:', response);
            if (response && response.success) {
                localStorage.setItem('isSettingsMenuActive', response.error);
		        sessionStorage.setItem('isSettingsMenuActive', response.error);
                for (const [key, value] of Object.entries(response.data)) {
                    let newItem: any = value;
                    localStorage.setItem(key, newItem);
                    sessionStorage.setItem(key, newItem);
                }
                this.sharedService.getAlertMessage('success', response.message);
                setTimeout(() => {
                    this.router.navigate(['/admin/dashboard']);
                }, 1000);
            } else {
                this.sharedService.getAlertMessage('error', response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.sharedService.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
        });
	}

	setFormValidation() {
		return !this.adminLoginName || !this.adminPassword ? true : false;
	}

}
