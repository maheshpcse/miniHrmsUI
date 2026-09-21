import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortalService } from '../../../../../api-services/portal.service';
import { AuthAdminService } from '../../../../../api-services/auth-admin.service';
import {
  detailRows,
  displayValue,
  titleValue,
  revealDetails,
} from '../../../../../ui/presentation';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit, OnDestroy {
  data: any = {};
  employee: any = {};
  loading = false;
  error = '';
  tab = 'Profile';
  tabs = ['Profile', 'Personal Details', 'Bank Details', 'Onboarding'];
  subscription: Subscription;
  request: Subscription;
  empId = '';
  titleValue = titleValue;
  displayValue = displayValue;
  constructor(
    private route: ActivatedRoute,
    public api: PortalService,
    public auth: AuthAdminService
  ) {}
  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.empId = params.get('empId') || sessionStorage.getItem('empId') || '';
      this.load();
    });
  }
  get ownProfile() {
    return this.empId === sessionStorage.getItem('empId');
  }
  load() {
    if (this.request) this.request.unsubscribe();
    this.loading = true;
    this.error = '';
    this.request = this.api
      .get('/employees/' + encodeURIComponent(this.empId))
      .subscribe(
        (data) => {
          this.data = data;
          this.employee = data.employeeInfo || {};
          this.loading = false;
          revealDetails('employee-profile');
        },
        (e) => {
          this.loading = false;
          this.error = this.api.message(e);
        }
      );
  }
  get details() {
    return detailRows(
      this.tab === 'Profile'
        ? this.employee
        : this.tab === 'Personal Details'
        ? this.data.empBasicInfo
        : this.tab === 'Bank Details'
        ? this.data.empBankInfo
        : this.data.empOnboardingInfo
    );
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.request) this.request.unsubscribe();
  }
}
