import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from './auth-admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { SharedService } from './shared.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService {

    public role: any = sessionStorage.getItem('role');

	constructor(
		private router: Router,
        public authAdminService: AuthAdminService,
        public sharedService: SharedService,
        public toastr: ToastrManager
	) { }

	canActivate(): boolean {
        if (this.role == 'admin' && this.authAdminService.isLoggedIn(this.role)) {
            return true;
        } else {
            this.sharedService.getAlertMessage('warning', 'You are not authenticated or authorized user, Please login or signup.');
            this.authAdminService.isLoggedOut();
            return false;
        }
    }
    
}
