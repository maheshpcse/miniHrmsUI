import { titleValue, displayValue } from '../../../ui/presentation';
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
          <ui-avatar [person]="user" [large]="true"></ui-avatar>
          <div>
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <span class="muted">{{ titleValue(user.roleName) }}</span>
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
            <dd>
              <span class="profile-status">{{ statusLabel(user.status) }}</span>
            </dd>
          </dl>
        </div>
        <div class="profile-actions">
          <a class="button secondary" routerLink="/admin/profile/employment"
            >View employment details <ui-icon name="arrow"></ui-icon
          ></a>
        </div>
      </ng-container>
      <form
        *ngIf="mode === 'profile-settings'"
        #profileForm="ngForm"
        (ngSubmit)="saveProfile(profileForm)"
        novalidate
      >
        <div class="avatar-editor">
          <ui-avatar [person]="user" [large]="true"></ui-avatar>
          <div>
            <h2>Profile Photo</h2>
            <p>PNG or JPEG, up to 5 MB.</p>
            <label class="button secondary avatar-upload"
              >{{ uploading ? 'Uploading...' : 'Upload Photo'
              }}<input
                type="file"
                accept="image/png,image/jpeg"
                [disabled]="uploading"
                (change)="uploadAvatar($event)"
                aria-label="Upload profile photo" /></label
            ><button
              *ngIf="user.avatarDataUrl"
              type="button"
              class="button secondary"
              [disabled]="uploading"
              (click)="removeAvatar()"
            >
              Remove Photo
            </button>
          </div>
        </div>
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
          <label
            >Username<input
              name="userName"
              [(ngModel)]="user.userName"
              required
              maxlength="50"
              autocomplete="username" /></label
          ><label>Work email<input [value]="user.email" readonly /></label>
          <label
            >Mobile Number<input
              type="tel"
              name="mobile"
              [(ngModel)]="user.mobile"
              maxlength="30"
              autocomplete="tel"
          /></label>
          <label
            >Date Of Birth<input
              type="date"
              name="dateOfBirth"
              [(ngModel)]="user.dateOfBirth"
              [max]="today"
              autocomplete="bday"
          /></label>
          <label class="span-two"
            >Street Address<input
              name="street"
              [(ngModel)]="user.address.addressLine1"
              maxlength="250"
              autocomplete="street-address"
          /></label>
          <label
            >City<input
              name="city"
              [(ngModel)]="user.address.city"
              maxlength="100"
              autocomplete="address-level2"
          /></label>
          <label
            >State<input
              name="state"
              [(ngModel)]="user.address.state"
              maxlength="100"
              autocomplete="address-level1"
          /></label>
          <label
            >Country<input
              name="country"
              [(ngModel)]="user.address.country"
              maxlength="100"
              autocomplete="country-name"
          /></label>
          <label
            >Postal Code<input
              name="postalCode"
              [(ngModel)]="user.address.postalCode"
              maxlength="20"
              autocomplete="postal-code"
          /></label>
        </div>
        <p class="muted">
          Work email, employee ID and workspace access are managed by HR.
        </p>
        <div class="notice error" *ngIf="formError" role="alert">
          {{ formError }}
        </div>
        <div class="form-actions">
          <button class="button primary" [disabled]="saving">
            {{ saving ? 'Saving...' : 'Save changes' }}
          </button>
        </div>
      </form>
      <section
        class="password-settings"
        *ngIf="mode === 'profile-settings'"
        aria-labelledby="password-settings-title"
      >
        <h2 id="password-settings-title">Change Password</h2>
        <p class="muted">
          Set a new password for your account. Other signed-in sessions will be
          signed out.
        </p>
        <form
          #passwordForm="ngForm"
          (ngSubmit)="changePassword(passwordForm)"
          novalidate
        >
          <div class="form-grid">
            <label
              >New Password<input
                type="password"
                name="newPassword"
                [(ngModel)]="newPassword"
                required
                minlength="10"
                maxlength="72"
                autocomplete="new-password" /></label
            ><label
              >Confirm New Password<input
                type="password"
                name="confirmPassword"
                [(ngModel)]="confirmPassword"
                required
                autocomplete="new-password"
            /></label>
          </div>
          <p class="muted">
            Use at least 10 characters and no more than 72 UTF-8 bytes.
          </p>
          <div *ngIf="passwordError" class="notice error" role="alert">
            {{ passwordError }}
          </div>
          <div class="form-actions">
            <button
              type="submit"
              class="button primary"
              [disabled]="changingPassword"
            >
              {{ changingPassword ? 'Updating...' : 'Change Password' }}
            </button>
          </div>
        </form>
      </section>
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
  titleValue = titleValue;
  today = new Date().toISOString().slice(0, 10);
  newPassword = '';
  confirmPassword = '';
  passwordError = '';
  changingPassword = false;
  changePassword(form: NgForm) {
    if (this.changingPassword) return;
    this.passwordError = '';
    if (form.invalid) {
      Object.keys(form.controls).forEach((k) =>
        form.controls[k].markAsTouched()
      );
      this.passwordError =
        'Complete all password fields with at least 10 characters for the new password.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'The new passwords do not match.';
      return;
    }
    this.changingPassword = true;
    this.subs.add(
      this.api
        .post('/me/password', {
          password: this.newPassword,
        })
        .subscribe(
          () => {
            this.changingPassword = false;
            form.resetForm();
            this.newPassword = this.confirmPassword = '';
            this.feedback.saved(
              'Your password has been changed. Other sessions have been signed out.'
            );
          },
          (e) => {
            this.changingPassword = false;
            this.passwordError = this.api.message(e);
          }
        )
    );
  }
  statusLabel(value: any) {
    return displayValue(value, 'status');
  }
  uploading = false;
  uploadAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    if (
      !['image/png', 'image/jpeg'].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      this.formError = 'Choose a PNG or JPEG image no larger than 5 MB.';
      input.value = '';
      return;
    }
    const body = new FormData();
    body.append('avatar', file);
    this.uploading = true;
    this.formError = '';
    this.subs.add(
      this.api.post('/me/avatar', body).subscribe(
        (data) => {
          this.user = { ...this.user, ...data };
          this.uploading = false;
          input.value = '';
          this.feedback.saved('Your profile photo has been updated.');
        },
        (e) => {
          this.uploading = false;
          input.value = '';
          this.formError = this.api.message(e);
        }
      )
    );
  }
  removeAvatar() {
    this.uploading = true;
    this.subs.add(
      this.api.post('/me/avatar/remove', {}).subscribe(
        (data) => {
          this.user = { ...this.user, ...data };
          this.uploading = false;
          this.feedback.saved('Your profile photo has been removed.');
        },
        (e) => {
          this.uploading = false;
          this.formError = this.api.message(e);
        }
      )
    );
  }
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
        this.user = { ...user, address: user.address || {} };
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
          userName: this.user.userName,
          mobile: this.user.mobile,
          dateOfBirth: this.user.dateOfBirth,
          address: this.user.address,
        })
        .subscribe(
          (data) => {
            this.saving = false;
            this.user = { ...this.user, ...data };
            sessionStorage.setItem('firstName', data.firstName);
            sessionStorage.setItem('lastName', data.lastName || '');
            sessionStorage.setItem(
              'userName',
              data.userName || this.user.userName
            );
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
