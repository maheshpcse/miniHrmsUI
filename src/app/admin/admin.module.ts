import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './access/admin-login/admin-login.component';
import { AdminForgotPasswordComponent } from './access/admin-forgot-password/admin-forgot-password.component';
import { AdminChangePasswordComponent } from './access/admin-change-password/admin-change-password.component';
import { AdminHeaderComponent } from './layouts/admin-header/admin-header.component';
import { AdminFooterComponent } from './layouts/admin-footer/admin-footer.component';
import { AdminSidemenuComponent } from './layouts/admin-sidemenu/admin-sidemenu.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

@NgModule({
	declarations: [
		AdminLoginComponent,
		AdminForgotPasswordComponent,
		AdminChangePasswordComponent,
		AdminHeaderComponent,
		AdminFooterComponent,
		AdminSidemenuComponent,
		AdminDashboardComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
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
		{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
	]
})
export class AdminModule { }
