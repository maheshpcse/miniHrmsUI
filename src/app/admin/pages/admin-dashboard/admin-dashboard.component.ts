import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

    getSideBarState() {
        return this.adminSidebarService.getSidebarState();
    }

}
