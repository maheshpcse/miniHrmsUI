import { CorePageComponent } from './pages/hr-core/core-page.component';
import { OrganizationTreeComponent } from './pages/hr-core/organization-tree.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../api-services/auth-guard.service';
import { AdminLoginComponent } from './access/admin-login/admin-login.component';
import { AdminForgotPasswordComponent } from './access/admin-forgot-password/admin-forgot-password.component';
import { AdminChangePasswordComponent } from './access/admin-change-password/admin-change-password.component';
import { SignupComponent } from './access/signup.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ResourcePageComponent } from './pages/workspace/resource-page.component';
import { ViewEmployeeComponent } from './pages/employees/all-employees/view-employee/view-employee.component';
import { AccountPageComponent } from './pages/workspace/account-page.component';
const protectedResource = (path: string, resource: string) => ({
  path,
  component: ResourcePageComponent,
  canActivate: [AuthGuardService],
  data: { resource },
});
const routes: Routes = [
  {
    path: 'hr/:module',
    component: CorePageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'organization',
    component: OrganizationTreeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile/employment',
    component: ViewEmployeeComponent,
    canActivate: [AuthGuardService],
  },
  ...['profile', 'profile-settings', 'settings'].map((account) => ({
    path: account,
    component: AccountPageComponent,
    canActivate: [AuthGuardService],
    data: { account },
  })),
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: AdminForgotPasswordComponent },
  { path: 'reset-password', component: AdminChangePasswordComponent },
  { path: 'change-password', redirectTo: 'forgot-password', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuardService],
  },
  protectedResource('employees/all-employees', 'employees'),
  protectedResource('employees/login-history', 'login-history'),
  {
    path: 'employees/view-employee/:empId',
    component: ViewEmployeeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'employees',
    redirectTo: 'employees/all-employees',
    pathMatch: 'full',
  },
  protectedResource('forms/login-encrypt-decrypt', 'encryption'),
  ...['menus', 'roles', 'permissions', 'attendance-types', 'leave-types'].map(
    (kind) => protectedResource('forms/' + kind, kind)
  ),
  protectedResource('requests', 'requests'),
  protectedResource('notifications', 'notifications'),
  {
    path: 'notifications/send',
    component: ResourcePageComponent,
    canActivate: [AuthGuardService],
    data: { resource: 'notifications', create: true },
  },
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AdminRoutingModule {}
