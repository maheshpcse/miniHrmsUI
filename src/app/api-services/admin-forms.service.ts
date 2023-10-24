import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIURL } from './api-url.service';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class AdminFormsService {

	public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

	constructor(
		private http: HttpClient,
        public router: Router
	) { }

	// ADMIN forms API Service's

    saveLoginEncryptData(data?: any) {
        return this.http.post<any>(APIURL.SAVE_LOGIN_ENCRYPT_DATA, data);
    }
}
