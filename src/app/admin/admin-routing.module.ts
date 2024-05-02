import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../api-services/auth-guard.service';
import { AdminLoginComponent } from './access/admin-login/admin-login.component';
import { AdminForgotPasswordComponent } from './access/admin-forgot-password/admin-forgot-password.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AllEmployeesComponent } from './pages/employees/all-employees/all-employees.component';
import { ViewEmployeeComponent } from './pages/employees/all-employees/view-employee/view-employee.component';
import { LoginHistoryComponent } from './pages/employees/login-history/login-history.component';
import { LoginEncryptDecryptComponent } from './pages/forms/login-encrypt-decrypt/login-encrypt-decrypt.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},

	// *********** Admin Access Routes *********************
	{
		path: 'login',
		component: AdminLoginComponent
	},
	{
		path: 'forgot-password',
		component: AdminForgotPasswordComponent
	},

	// *********** Admin Dashboard Routes ******************
	{
		path: 'dashboard',
		canActivate: [AuthGuardService],
		component: AdminDashboardComponent
	},
	{
		path: 'employees',
		canActivate: [AuthGuardService],
		children: [
			{
				path: 'all-employees',
				component: AllEmployeesComponent
			},
			{
				path: 'view-employee/:empId',
				component: ViewEmployeeComponent
			},
			{
				path: 'login-history',
				component: LoginHistoryComponent
			}
		]
	},
	{
		path: 'forms',
		canActivate: [AuthGuardService],
		children: [
			{
				path: 'login-encrypt-decrypt',
				component: LoginEncryptDecryptComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
