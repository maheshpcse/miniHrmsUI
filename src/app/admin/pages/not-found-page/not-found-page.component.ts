import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import * as _ from 'underscore';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { AdminEmployeesService } from 'src/app/api-services/admin-employees.service';
import { SharedService } from 'src/app/api-services/shared.service';
declare var $: any;

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

    public employeeInfo: any = {};
    public empBasicInfo: any = {};
    public empBankInfo: any = {};
    public empOnboardInfo: any = {};

    constructor(
		public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
		public adminEmployeesService: AdminEmployeesService,
		public sharedService: SharedService,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        this.getEmployeeDataByIdDetails();
    }

    getEmployeeDataByIdDetails() {
		const employeePayload = {
			empId: 'EMP002'
		}
		console.log('Get employee data by id employeePayload isss:', employeePayload);

		this.adminEmployeesService.getEmployeeDataById(employeePayload).subscribe(async (response: any) => {
            console.log('Get employee data by id response isss:', response);
            if (response && response.success) {
				this.employeeInfo = response.data;
            } else {
                this.sharedService.getAlertMessage('error', response.message);
            }
        }, (error: any) => {
            this.sharedService.getAlertMessage('warning', 'Network failed, Please try again.');
        });
	}

}
