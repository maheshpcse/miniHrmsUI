import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../api-services/auth-guard.service';
import { AdminLoginComponent } from './access/admin-login/admin-login.component';
import { AdminForgotPasswordComponent } from './access/admin-forgot-password/admin-forgot-password.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
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
