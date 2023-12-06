import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIURL } from './api-url.service';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class AdminEmployeesService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

	constructor(
		private http: HttpClient,
        public router: Router
	) { }

	// ADMIN employees API Service's
    saveEmployeeData(data?: any) {
        return this.http.post<any>(APIURL.SAVE_EMPLOYEE_DATA, data);
    }

    getAllEmployeesData(data?: any) {
        return this.http.post<any>(APIURL.GET_ALL_EMPLOYEES_DATA, data);
    }

    getEmployeeDataById(data?: any) {
        return this.http.post<any>(APIURL.GET_EMPLOYEE_DATA_BY_ID, data);
    }

    updateEmployeeDataStatus(data?: any) {
        return this.http.put<any>(APIURL.UPDATE_EMPLOYEE_DATA_STATUS, data);
    }
    
    getLoginHistoryData(data?: any) {
        return this.http.post<any>(APIURL.GET_LOGIN_HISTORY_DATA, data);
    }
}
