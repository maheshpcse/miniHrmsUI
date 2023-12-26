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
    
    public spinner: any = false;
    public empData: any = {};
    public employeeInfo: any = {};
    public empBasicInfo: any = {};
    public empBankInfo: any = {};
    public empOnboardingInfo: any = {};

    public atmCardInfo: any = {};
    public bankInfo: any = {};

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
        this.spinner = true;

		const employeePayload = {
			empId: 'EMP002'
		}
		console.log('Get employee data by id employeePayload isss:', employeePayload);

		this.adminEmployeesService.getEmployeeDataById(employeePayload).subscribe(async (response: any) => {
            console.log('Get employee data by id response isss:', response);
            if (response && response.success) {
				// this.employeeInfo = response.data['employeeInfo'] || {};
				// this.empBasicInfo = response.data['empBasicInfo'] || {};
				// this.empBankInfo = response.data['empBankInfo'] || {};
				// this.empOnboardingInfo = response.data['empOnboardingInfo'] || {};
                this.empData = response.data;
                this.getEmployeeTabsData(3);
                // this.employeeInfo = this.setNoDataToEmployee(response.data['employeeInfo']);
				// this.empBasicInfo = this.setNoDataToEmployee(response.data['empBasicInfo']);
				// this.empBankInfo = this.setNoDataToEmployee(response.data['empBankInfo']);
				// this.empOnboardingInfo = this.setNoDataToEmployee(response.data['empOnboardingInfo']);
                // this.atmCardInfo = this.empBankInfo['atmCardInfo'][0];
            } else {
                this.sharedService.getAlertMessage('error', response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.sharedService.getAlertMessage('warning', 'Network failed, Please try again.');
            this.spinner = false;
        });
	}

    getEmployeeTabsData(tab?: any) {
        if (tab == 0) this.employeeInfo = this.setNoDataToEmployee(this.empData['employeeInfo']);
        else if (tab == 1) this.empBasicInfo = this.setNoDataToEmployee(this.empData['empBasicInfo']);
        else if (tab == 2) this.empBankInfo = this.setNoDataToEmployee(this.empData['empBankInfo']);
        else if (tab == 3) this.empOnboardingInfo = this.setNoDataToEmployee(this.empData['empOnboardingInfo']);

        if (tab == 2) {
            this.atmCardInfo = {};
            this.bankInfo = {};
        }
    }

    setNoDataToEmployee(data: any = {}) {
        data = data && Object.keys(data).length > 0 ? data : {};
        for (let [key, value] of Object.entries(data)) {
            data[key] = data[key] ? data[key] : 'N/A';
        }
        return data;
    }

    getEmpData(data?: any) {
        return Object.keys(data).length > 0;
    }

    setAtmCardNumber(cardnumber?: any) {
        let cardNumberArr: any = cardnumber ? cardnumber.split('') : [];
        // console.log('cardNumberArr isss:', cardNumberArr);
        let cardNumObj: any = {4:[],8:[],12:[],16:[]};
        let id: any = 0;
        for (let item of cardNumberArr) {
            if (id < 4) {
                cardNumObj[4].push('*');
            } else if (id >= 4 && id < 8) {
                cardNumObj[8].push('*');
            } else if (id >= 8 && id < 12) {
                cardNumObj[12].push('*');
            } else if (id >= 12) {
                cardNumObj[16].push(item);
            }
            id += 1;
        }

        let finalCardNum: any = '';
        for (let [key,value] of Object.entries(cardNumObj)) {
            finalCardNum = finalCardNum.concat(cardNumObj[key].join(''))
            finalCardNum = finalCardNum.concat(' ');
        }
        // console.log('finalCardNum isss:', finalCardNum.trim());
        return finalCardNum.trim();
    }

    showHideAtmCardInfo(data?: any) {
        this.atmCardInfo = data;
    }

    getAtmCardInfo(data?: any) {
        return Object.keys(data).length > 0;
    }

    getBankInfo(data?: any) {
        return Object.keys(data).length > 0;
    }

}
