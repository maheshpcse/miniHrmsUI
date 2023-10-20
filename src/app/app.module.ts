import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgOtpInputModule } from 'ng-otp-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './api-services/auth-guard.service';
import { AuthAdminService } from './api-services/auth-admin.service';
import { AuthTokenInterceptorService } from './api-services/auth-token-interceptor.service';
import { CommonService } from './api-services/common.service';
import { SharedService } from './api-services/shared.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		// CommonModule,
		// ApplicationModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
		CalendarModule,
		ToastrModule.forRoot(),
		AngularMultiSelectModule,
		NgMultiSelectDropDownModule.forRoot(),
		SweetAlert2Module.forRoot(),
    	Ng2SearchPipeModule,
		NgOtpInputModule,
		BsDropdownModule.forRoot(),
    	PerfectScrollbarModule
	],
	providers: [
		AuthGuardService,
		AuthAdminService,
		CommonService,
		SharedService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true },
		{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
