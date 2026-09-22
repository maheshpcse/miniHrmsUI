import { CorePageComponent } from './pages/hr-core/core-page.component';
import { OrganizationTreeComponent } from './pages/hr-core/organization-tree.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './access/admin-login/admin-login.component';
import { AdminForgotPasswordComponent } from './access/admin-forgot-password/admin-forgot-password.component';
import { AdminChangePasswordComponent } from './access/admin-change-password/admin-change-password.component';
import { SignupComponent } from './access/signup.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ResourcePageComponent } from './pages/workspace/resource-page.component';
import { ViewEmployeeComponent } from './pages/employees/all-employees/view-employee/view-employee.component';
import { AccountPageComponent } from './pages/workspace/account-page.component';
@NgModule({
  declarations: [
    CorePageComponent,
    OrganizationTreeComponent,
    AccountPageComponent,
    AdminLoginComponent,
    AdminForgotPasswordComponent,
    AdminChangePasswordComponent,
    SignupComponent,
    AdminDashboardComponent,
    ResourcePageComponent,
    ViewEmployeeComponent,
  ],
  imports: [CommonModule, FormsModule, UiModule, AdminRoutingModule],
})
export class AdminModule {}
