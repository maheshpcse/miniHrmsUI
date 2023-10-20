import { Component, OnInit } from '@angular/core';
import { AdminSidebarService } from 'src/app/api-services/admin-sidebar.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    constructor(
        public adminSidebarService: AdminSidebarService
    ) { }

    ngOnInit(): void {
    }

    toggleSidebar() {
        this.adminSidebarService.setSidebarState(!this.adminSidebarService.getSidebarState());
    }

    toggleBackgroundImage() {
        this.adminSidebarService.hasBackgroundImage = !this.adminSidebarService.hasBackgroundImage;
    }

    getSideBarState() {
        return this.adminSidebarService.getSidebarState();
    }

    hideSidebar() {
        this.adminSidebarService.setSidebarState(true);
    }

}
