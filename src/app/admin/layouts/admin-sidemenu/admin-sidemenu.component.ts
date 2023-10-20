import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { AdminSidebarService } from 'src/app/api-services/admin-sidebar.service';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
declare var $: any;

@Component({
    selector: 'app-admin-sidemenu',
    templateUrl: './admin-sidemenu.component.html',
    styleUrls: ['./admin-sidemenu.component.css'],
    animations: [
        trigger('slide', [
            state('up', style({ height: 0 })),
            state('down', style({ height: '*' })),
            transition('up <=> down', animate(200))
        ])
    ]
})
export class AdminSidemenuComponent implements OnInit {

    menus = [];
    public adminLoginId: any = sessionStorage.getItem('adminLoginId');
    public auditLoginId: any = sessionStorage.getItem('auditLoginId');
    public spinner: any = false;

    constructor(
        public adminSidebarService: AdminSidebarService,
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
    ) {
        this.menus = adminSidebarService.getMenuList();
    }

    ngOnInit(): void {
    }

    toggleSidebar() {
        this.adminSidebarService.setSidebarState(!this.adminSidebarService.getSidebarState());
    }

    getSideBarState() {
        return this.adminSidebarService.getSidebarState();
    }

    toggle(currentMenu) {
        if (currentMenu.type === 'dropdown') {
            this.menus.forEach(element => {
                if (element === currentMenu) {
                    currentMenu.active = !currentMenu.active;
                } else {
                    element.active = false;
                }
            });
        }
    }

    getState(currentMenu) {

        if (currentMenu.active) {
            return 'down';
        } else {
            return 'up';
        }
    }

    hasBackgroundImage() {
        return this.adminSidebarService.hasBackgroundImage;
    }

    adminLogout() {
        this.spinner = true;

        const adminLogoutPayload = {
			adminLoginId: this.adminLoginId,
			auditLoginId: this.auditLoginId
		}
		console.log('Get adminLogoutPayload data isss:', adminLogoutPayload);

		this.authAdminService.adminAndSettingsLogout(adminLogoutPayload).subscribe(async (response: any) => {
            console.log('Get admin logout data response isss:', response);
            if (response && response.success) {
                setTimeout(() => {
                    $('#adminLogoutModal').modal('hide');
                    this.getAlertMessage('success', response.message);
                    this.spinner = false;
                    this.authAdminService.isLoggedOut();
                }, 1000);
            } else {
                this.getAlertMessage('error', response.message);
                this.spinner = false;
            }
        }, (error: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
        });
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
