import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PortalService } from '../../../api-services/portal.service';
import { AuthAdminService } from '../../../api-services/auth-admin.service';
import { FeedbackService } from '../../../ui/feedback.service';
@Component({
  selector: 'app-account-page',
  template: ` <div class="page-heading">
      <div>
        <span class="eyebrow">YOUR WORKSPACE</span>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <div class="heading-actions" *ngIf="mode === 'profile'">
        <a class="button primary" routerLink="/admin/profile-settings"
          ><ui-icon name="edit"></ui-icon>Edit profile</a
        >
      </div>
    </div>
    <ui-state [loading]="loading" [error]="error" (retry)="load()"></ui-state>
    <section class="panel account-panel" *ngIf="!loading && !error">
      <ng-container *ngIf="mode === 'profile'"
        ><div class="profile-identity">
          <span class="avatar">{{ (user.firstName || '?').charAt(0) }}</span>
          <div>
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <span class="muted">{{ user.roleName }}</span>
          </div>
        </div>
        <div class="detail-grid">
          <dl>
            <dt>Employee ID</dt>
            <dd>{{ user.empId }}</dd>
          </dl>
          <dl>
            <dt>Username</dt>
            <dd>{{ user.userName }}</dd>
          </dl>
          <dl>
            <dt>Work email</dt>
            <dd>{{ user.email }}</dd>
          </dl>
          <dl>
            <dt>Status</dt>
            <dd>Active</dd>
          </dl>
        </div>
        <a
          class="button secondary"
          [routerLink]="['/admin/employees/view-employee', user.empId]"
          >View employment details <ui-icon name="arrow"></ui-icon
        ></a>
      </ng-container>
      <form
        *ngIf="mode === 'profile-settings'"
        #profileForm="ngForm"
        (ngSubmit)="saveProfile(profileForm)"
        novalidate
      >
        <div class="form-grid">
          <label
            >First name<input
              name="firstName"
              [(ngModel)]="user.firstName"
              required
              maxlength="50"
              autocomplete="given-name" /></label
          ><label
            >Last name<input
              name="lastName"
              [(ngModel)]="user.lastName"
              maxlength="50"
              autocomplete="family-name"
          /></label>
          <label>Username<input [value]="user.userName" readonly /></label
          ><label>Work email<input [value]="user.email" readonly /></label>
        </div>
        <p class="muted">
          Contact HR to change your work email, username or role.
        </p>
        <div class="notice error" *ngIf="formError" role="alert">
          {{ formError }}
        </div>
        <div class="form-actions">
          <a routerLink="/admin/forgot-password" class="button secondary"
            >Reset password</a
          ><button class="button primary" [disabled]="saving">
            {{ saving ? 'Saving...' : 'Save changes' }}
          </button>
        </div>
      </form>
      <form *ngIf="mode === 'settings'" (ngSubmit)="saveSettings()">
        <h2>Workspace preferences</h2>
        <p class="muted">
          These preferences apply to this browser for your account.
        </p>
        <div class="form-grid">
          <label
            >Motion<ui-select
              name="motion"
              [(ngModel)]="motion"
              [options]="motionOptions"
              ariaLabel="Motion preference"
            ></ui-select></label
          ><label
            >People directory view<ui-select
              name="view"
              [(ngModel)]="view"
              [options]="viewOptions"
              ariaLabel="Default directory view"
            ></ui-select
          ></label>
        </div>
        <div class="form-actions">
          <button class="button primary">Save changes</button>
        </div>
        <div class="settings-links" *ngIf="auth.allowed('settings:write')">
          <h2>Workspace administration</h2>
          <a routerLink="/admin/forms/roles"
            >Roles and access <ui-icon name="arrow"></ui-icon></a
          ><a routerLink="/admin/forms/menus"
            >Menu shortcuts <ui-icon name="arrow"></ui-icon></a
          ><a routerLink="/admin/forms/attendance-types"
            >Attendance schedules <ui-icon name="arrow"></ui-icon></a
          ><a routerLink="/admin/forms/leave-types"
            >Leave policies <ui-icon name="arrow"></ui-icon
          ></a>
        </div>
      </form>
    </section>`,
})
export class AccountPageComponent implements OnInit, OnDestroy {
  mode = 'profile';
  user: any = {};
  loading = false;
  saving = false;
  error = '';
  formError = '';
  motion = 'system';
  view = 'table';
  motionOptions = [
    { value: 'system', label: 'Follow device preference' },
    { value: 'reduced', label: 'Reduce animation' },
  ];
  viewOptions = [
    { value: 'table', label: 'Table view' },
    { value: 'grid', label: 'Card view' },
  ];
  subs = new Subscription();
  request: Subscription;
  constructor(
    private route: ActivatedRoute,
    public api: PortalService,
    public auth: AuthAdminService,
    private feedback: FeedbackService
  ) {}
  get key() {
    return 'hr-preferences-' + this.auth.getLoginId();
  }
  get title() {
    return this.mode === 'profile'
      ? 'My profile'
      : this.mode === 'profile-settings'
      ? 'Profile settings'
      : 'Settings';
  }
  get description() {
    return this.mode === 'profile'
      ? 'Your identity and place in the team.'
      : this.mode === 'profile-settings'
      ? 'Keep your personal profile up to date.'
      : 'Make your HR workspace feel right for you.';
  }
  ngOnInit() {
    this.subs.add(
      this.route.data.subscribe((data) => {
        this.mode = data.account;
        this.formError = '';
        this.load();
      })
    );
  }
  load() {
    if (this.request) {
      this.request.unsubscribe();
    }
    this.error = '';
    if (this.mode === 'settings') {
      this.loading = false;
      try {
        const p = JSON.parse(localStorage.getItem(this.key) || '{}');
        this.motion = p.motion || 'system';
        this.view = p.view || 'table';
      } catch (_) {}
      return;
    }
    this.loading = true;
    this.request = this.api.get('/me').subscribe(
      (user) => {
        this.user = user;
        this.loading = false;
      },
      (e) => {
        this.error = this.api.message(e);
        this.loading = false;
      }
    );
  }
  saveProfile(form: NgForm) {
    if (this.saving) {
      return;
    }
    if (form.invalid || !String(this.user.firstName).trim()) {
      Object.keys(form.controls).forEach((k) =>
        form.controls[k].markAsTouched()
      );
      this.formError = 'Please enter your first name.';
      return;
    }
    this.saving = true;
    this.formError = '';
    this.subs.add(
      this.api
        .put('/me', {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
        })
        .subscribe(
          (data) => {
            this.saving = false;
            this.user = { ...this.user, ...data };
            sessionStorage.setItem('firstName', data.firstName);
            sessionStorage.setItem('lastName', data.lastName || '');
            this.feedback.saved('Your profile has been updated.');
          },
          (e) => {
            this.saving = false;
            this.formError = this.api.message(e);
          }
        )
    );
  }
  saveSettings() {
    localStorage.setItem(
      this.key,
      JSON.stringify({ motion: this.motion, view: this.view })
    );
    document.documentElement.setAttribute('data-motion', this.motion);
    this.feedback.saved('Your workspace preferences have been saved.');
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
    if (this.request) {
      this.request.unsubscribe();
    }
  }
}
