import { Component, OnInit } from '@angular/core';
import { AdminSidebarService } from 'src/app/api-services/admin-sidebar.service';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

    constructor(
		public adminSidebarService: AdminSidebarService
    ) { }

    ngOnInit(): void {
    }

    toggleSidebar() {
        this.adminSidebarService.setSidebarState(!this.adminSidebarService.getSidebarState());
    }

}
