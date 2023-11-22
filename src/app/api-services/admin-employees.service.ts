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
    getLoginHistoryData(data?: any) {
        return this.http.post<any>(APIURL.GET_LOGIN_HISTORY_DATA, data);
    }
}
