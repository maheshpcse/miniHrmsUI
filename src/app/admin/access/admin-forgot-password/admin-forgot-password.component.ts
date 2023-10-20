import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgOtpInputComponent } from 'ng-otp-input';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';

@Component({
    selector: 'app-admin-forgot-password',
    templateUrl: './admin-forgot-password.component.html',
    styleUrls: ['./admin-forgot-password.component.css']
})
export class AdminForgotPasswordComponent implements OnInit {

    @ViewChild('emailForm', { static: false }) emailFormRef: NgForm;
    @ViewChild('passwordForm', { static: false }) passwordFormRef: NgForm;
    @ViewChild('ngOtpInput', { static: false }) ngOtpInputRef: any;
    // @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;
	public emailName: any = null;
	public newPassword: any = null;
	public confirmPassword: any = null;
    public isValidEmail: any = false;
    public otpInput: any = null;
    public otpMail: any = null;
	public spinner: any = false;
    public formStep: number = 1;
    public otpConfig: any = {
        length: 6,
        allowNumbersOnly: true,
        disableAutoFocus: true
    };
    public setTime: any = '10:00';
    public startTime: any = null;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
    }

    getValidateAdminEmail() {
		this.spinner = true;

        if (!this.emailName) {
            this.spinner = false;
            return this.toastr.errorToastr('Please fill the required fields.');
        }

        const emailPayload = {
            adminEmail: this.emailName
        }
        console.log('Get emailPayload data isss:', emailPayload);

        this.authAdminService.validateAdminEmail(emailPayload).subscribe(async (response: any) => {
            console.log('Get validate admin email data response isss:', response);
            if (response && response.success) {
                this.getAlertMessage('success', response.message);
                this.getStartOTPTimer();
                this.otpMail = response['data']['otp'] || null;
                this.isValidEmail = true;
            } else {
                this.getAlertMessage('error', response.message);
                this.formStep = 1;
                this.isValidEmail = false;
            }
            this.spinner = false;
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
            this.formStep = 1;
            this.isValidEmail = false;
        });
    }

    getStartOTPTimer() {
        this.startTime = setInterval(async() => {
			let currentTime = moment(moment().format('YYYY-MM-DD') + ` 00:${this.setTime}`).subtract(1, 'seconds').format('mm:ss');
            // console.log('currentTime isss:', currentTime);
			this.setTime = currentTime;
			// console.log('setTime', this.setTime);
			if (this.setTime == '00:00') {
				clearInterval(this.startTime);
				this.startTime = null;
				this.setTime = '10:00';
                this.getAlertMessage('warning', 'OTP expired!');
                this.formStep = 1;
                this.isValidEmail = false;
                this.emailFormRef.reset();
                this.emailName = null;
                this.otpInput = null;
                this.otpMail = null;
			}
		}, 1000);
    }

    onOtpChange(event?: any) {
        console.log('event isss:', event);
        // this.ngOtpInputRef.setValue(event);
        this.otpInput = event;
    }

    setOtpFormValidation() {
        if (this.otpInput && this.otpInput.toString().length == 6) {
            return false;
        } else {
            return true;
        }
    }

    validateOTP() {
		this.spinner = true;
        if (Number(this.otpInput) == Number(this.otpMail)) {
            setTimeout(() => {
                clearInterval(this.startTime);
				this.startTime = null;
				this.setTime = '10:00';
                this.formStep = 2;
                this.spinner = false;
            }, 1000);
        } else {
            setTimeout(() => {
                this.getAlertMessage('error', 'Invalid OTP entered.');
                this.formStep = 1;
                this.spinner = false;
            }, 1000);
        }
    }

    updateAdminPassword() {
        this.spinner = true;

        if (this.setFormValidation()) {
            this.spinner = false;
            return this.toastr.errorToastr('Please fill the required fields.');
        } else if (this.newPassword !== this.confirmPassword) {
            this.spinner = false;
            return this.toastr.errorToastr('New password and Confirm password is not match.');
        }

        const passwordPayload = {
            adminEmail: this.emailName,
            password: this.newPassword
        }
        console.log('Get passwordPayload data isss:', passwordPayload);

        this.authAdminService.updateAdminPassword(passwordPayload).subscribe(async (response: any) => {
            console.log('Get update admin password data response isss:', response);
            if (response && response.success) {
                this.getAlertMessage('success',response.message);
                this.router.navigate(['/admin/login']);
            } else {
                this.getAlertMessage('error', response.message);
                this.formStep = 2;
                this.isValidEmail = false;
            }
            this.spinner = false;
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
            this.formStep = 2;
        });
    }

    setFormValidation() {
		return !this.newPassword || !this.confirmPassword ? true : false;
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

    ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		if (this.router.url == `/admin/login`) {
			clearInterval(this.startTime);
			this.startTime = null;
			this.setTime = '10:00';
		}
	}

}
