import {
  detailRows,
  displayValue,
  titleValue,
  revealDetails,
} from '../../../ui/presentation';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PortalService } from '../../../api-services/portal.service';
import { AuthAdminService } from '../../../api-services/auth-admin.service';
import { FeedbackService } from '../../../ui/feedback.service';
const statuses = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' },
];
const field = (
  key: string,
  label: string,
  type = 'text',
  required = true,
  options: any[] = []
) => ({ key, label: titleValue(label), type, required, options });
export const RESOURCE_CONFIG: any = {
  employees: {
    title: 'People directory',
    eyebrow: 'YOUR PEOPLE',
    description: 'The people who make great work happen.',
    singular: 'employee',
    permission: 'employees:write',
    columns: [
      ['empId', 'Employee ID'],
      ['email', 'Email address'],
      ['roleName', 'Role'],
      ['status', 'Status'],
    ],
    fields: [
      field('empId', 'Employee ID'),
      field('firstName', 'First name'),
      field('lastName', 'Last name', 'text', false),
      field('userName', 'Username'),
      field('email', 'Work email', 'email'),
      field('roleName', 'Role', 'text'),
      field('status', 'Status', 'select', true, [
        ...statuses,
        { value: '2', label: 'Pending approval' },
        { value: '3', label: 'Notice period' },
      ]),
    ],
  },
  'login-history': {
    title: 'Login activity',
    eyebrow: 'WORKSPACE ACTIVITY',
    description: 'A clear picture of who signed in and when.',
    readonly: true,
    columns: [
      ['empId', 'Employee'],
      ['lastLoginTime', 'Signed in'],
      ['lastLogoutTime', 'Signed out'],
      ['sessionTime', 'Duration'],
      ['ipAddress', 'IP address'],
    ],
    fields: [],
  },
  menus: {
    title: 'Menu directory',
    eyebrow: 'WORKSPACE SETTINGS',
    description: 'Organize additional workspace shortcuts for your team.',
    singular: 'menu',
    permission: 'settings:write',
    columns: [
      ['code', 'Code'],
      ['path', 'Destination'],
      ['status', 'Status'],
    ],
    fields: [
      field('name', 'Menu name'),
      field('code', 'Unique code'),
      field('path', 'Internal route'),
      field('description', 'Description', 'textarea', false),
      field('status', 'Status', 'select', true, statuses),
    ],
  },
  roles: {
    title: 'Roles',
    eyebrow: 'ACCESS & RESPONSIBILITY',
    description:
      'Define responsibilities and the permissions behind each role.',
    singular: 'role',
    permission: 'settings:write',
    columns: [
      ['code', 'Role code'],
      ['permissions', 'Permissions'],
      ['status', 'Status'],
    ],
    fields: [
      field('name', 'Role name'),
      field('code', 'Role code'),
      field('permissions', 'Permission codes (comma separated)', 'text', false),
      field('description', 'Description', 'textarea', false),
      field('status', 'Status', 'select', true, statuses),
    ],
  },
  permissions: {
    title: 'Permissions',
    eyebrow: 'ACCESS & RESPONSIBILITY',
    description: 'The permission registry used to control workspace access.',
    readonly: true,
    columns: [
      ['code', 'Permission code'],
      ['description', 'Purpose'],
      ['status', 'Status'],
    ],
    fields: [],
  },
  'attendance-types': {
    title: 'Attendance types',
    eyebrow: 'WORKING RHYTHMS',
    description: 'Set up attendance schedules that work for your team.',
    singular: 'schedule',
    permission: 'settings:write',
    columns: [
      ['attendanceCode', 'Code'],
      ['attendanceType', 'Capture method'],
      ['logOnTime', 'Start time'],
      ['logOffTime', 'End time'],
      ['status', 'Status'],
    ],
    fields: [
      field('attendanceName', 'Schedule name'),
      field('attendanceCode', 'Schedule code'),
      field('attendanceType', 'Capture method', 'select', true, [
        { value: 'Online', label: 'Online' },
        { value: 'Bio-Metric', label: 'Biometric' },
      ]),
      field('logOnTime', 'Start time', 'time'),
      field('logOffTime', 'End time', 'time'),
      field('status', 'Status', 'select', true, statuses),
    ],
  },
  'leave-types': {
    title: 'Leave types',
    eyebrow: 'TIME TO RECHARGE',
    description: 'Define leave categories and their annual allowances.',
    singular: 'leave type',
    permission: 'settings:write',
    columns: [
      ['code', 'Code'],
      ['allowance', 'Days per year'],
      ['paid', 'Paid leave'],
      ['status', 'Status'],
    ],
    fields: [
      field('name', 'Leave type'),
      field('code', 'Unique code'),
      field('allowance', 'Annual allowance (days)', 'number'),
      field('paid', 'Paid leave', 'select', true, [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]),
      field('description', 'Description', 'textarea', false),
      field('status', 'Status', 'select', true, statuses),
    ],
  },
  requests: {
    title: 'Requests',
    eyebrow: 'KEEP WORK MOVING',
    description: 'Track requests, share context, and keep decisions clear.',
    singular: 'request',
    columns: [
      ['kind', 'Category'],
      ['empId', 'Employee'],
      ['status', 'Status'],
      ['createdAt', 'Created'],
    ],
    fields: [
      field('name', 'Subject'),
      field('kind', 'Category', 'select', true, [
        { value: 'leave', label: 'Leave' },
        { value: 'general', label: 'General' },
        { value: 'equipment', label: 'Equipment' },
      ]),
      field('description', 'Request details', 'textarea'),
      field('startDate', 'Start date', 'date', false),
      field('endDate', 'End date', 'date', false),
    ],
  },
  notifications: {
    title: 'Notification center',
    eyebrow: 'IN THE LOOP',
    description: 'Company updates and the information that matters.',
    singular: 'notification',
    permission: 'notifications:write',
    columns: [
      ['description', 'Message'],
      ['audience', 'Audience'],
      ['createdAt', 'Published'],
    ],
    fields: [
      field('name', 'Headline'),
      field('description', 'Message', 'textarea'),
      field('audience', 'Audience', 'select', true, [
        { value: 'all', label: 'Everyone' },
        { value: 'admin', label: 'Administrators' },
      ]),
    ],
  },
  encryption: {
    title: 'Login encryption',
    eyebrow: 'SECURITY SETTINGS',
    description:
      'Manage login encryption configuration with secrets hidden by default.',
    singular: 'configuration',
    permission: 'settings:write',
    columns: [
      ['loginType', 'Login type'],
      ['encryptType', 'Algorithm'],
      ['status', 'Status'],
    ],
    fields: [
      field('loginType', 'Login type', 'select', true, [
        { value: '1', label: 'Normal' },
        { value: '2', label: 'Settings' },
        { value: '3', label: 'Social' },
      ]),
      field('encryptType', 'Encryption algorithm'),
      field('encryptKey', 'Encryption key', 'password', false),
      field('status', 'Status', 'select', true, statuses),
    ],
  },
};
@Component({
  selector: 'app-resource-page',
  templateUrl: './resource-page.component.html',
})
export class ResourcePageComponent implements OnInit, OnDestroy {
  @Input() kind = '';
  config: any;
  rows: any[] = [];
  statusOptions = [
    { value: '', label: 'All statuses' },
    { value: '1', label: 'Active' },
    { value: '2', label: 'Pending' },
    { value: '0', label: 'Inactive' },
    { value: '3', label: 'Notice period' },
  ];
  count = 0;
  page = 1;
  limit = 10;
  query = '';
  status = '';
  sort = 'createdAt';
  direction = 'desc';
  loading = false;
  saving = false;
  error = '';
  formError = '';
  message = '';
  editing = false;
  model: any = {};
  view = 'table';
  selected: any = null;
  searchChanges = new Subject<string>();
  subs = new Subscription();
  request: Subscription;
  constructor(
    private route: ActivatedRoute,
    public api: PortalService,
    private feedback: FeedbackService,
    public auth: AuthAdminService
  ) {}
  ngOnInit() {
    this.subs.add(
      this.searchChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(() => {
          this.page = 1;
          this.load();
        })
    );
    this.subs.add(
      this.route.data.subscribe((data) => {
        this.kind = data.resource || this.kind;
        this.config = RESOURCE_CONFIG[this.kind];
        this.page = 1;
        this.query = '';
        this.status = '';
        this.sort = 'createdAt';
        this.direction = 'desc';
        try {
          this.view =
            JSON.parse(
              localStorage.getItem(
                'hr-preferences-' + this.auth.getLoginId()
              ) || '{}'
            ).view || 'table';
        } catch (_) {
          this.view = 'table';
        }
        this.selected = null;
        this.editing = false;
        this.message = '';
        this.load();
        if (data.create) {
          this.start();
        }
      })
    );
  }
  get canWrite() {
    return (
      !this.config.readonly &&
      (!this.config.permission || this.auth.allowed(this.config.permission))
    );
  }
  get lastPage() {
    return Math.max(1, Math.ceil(this.count / this.limit));
  }
  load() {
    if (this.request) {
      this.request.unsubscribe();
    }
    this.loading = true;
    this.error = '';
    this.request = this.api
      .get('/resources/' + this.kind, {
        page: this.page,
        limit: this.limit,
        q: this.query,
        status: this.status,
        sort: this.sort,
        direction: this.direction,
      })
      .subscribe(
        (data) => {
          this.rows = data.list || [];
          this.count = Number(data.count) || 0;
          this.loading = false;
          if (this.page > this.lastPage) {
            this.page = this.lastPage;
            this.load();
          }
        },
        (e) => {
          this.loading = false;
          this.rows = [];
          this.error = this.api.message(e);
        }
      );
  }
  markRead() {
    this.subs.add(
      this.api.post('/notifications/read', {}).subscribe(
        () =>
          this.feedback.saved('All current notifications are marked as read.'),
        (e) => (this.error = this.api.message(e))
      )
    );
  }
  search() {
    this.searchChanges.next(this.query);
  }
  filter() {
    this.page = 1;
    this.load();
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.lastPage && !this.loading) {
      this.page = page;
      this.load();
    }
  }
  sortable(key: string) {
    return !(
      {
        requests: ['empId'],
        menus: ['path'],
        roles: ['permissions'],
        'leave-types': ['allowance', 'paid'],
        encryption: ['name'],
      }[this.kind] || []
    ).includes(key);
  }
  nameKey() {
    return this.kind === 'employees'
      ? 'firstName'
      : this.kind === 'attendance-types'
      ? 'attendanceName'
      : 'name';
  }
  sortState(key: string) {
    return this.sort === key
      ? this.direction === 'asc'
        ? 'ascending'
        : 'descending'
      : 'none';
  }
  sortIcon(key: string) {
    return this.sort === key
      ? this.direction === 'asc'
        ? '\u2191'
        : '\u2193'
      : '\u2195';
  }
  order(key: string) {
    this.direction =
      this.sort === key && this.direction === 'asc' ? 'desc' : 'asc';
    this.sort = key;
    this.page = 1;
    this.load();
  }
  start(row?: any) {
    this.model = row
      ? { ...row }
      : {
          status: '1',
          roleName: 'employee',
          kind: 'general',
          audience: 'all',
          paid: 'yes',
        };
    if (this.kind === 'encryption') {
      this.model.encryptKey = '';
    }
    this.editing = true;
    this.formError = '';
    this.message = '';
    setTimeout(() => document.getElementById('resource-form-title')?.focus());
  }
  cancel() {
    this.editing = false;
    this.formError = '';
  }
  save(form: NgForm) {
    if (this.saving) {
      return;
    }
    if (form.invalid) {
      Object.keys(form.controls).forEach((k) =>
        form.controls[k].markAsTouched()
      );
      this.formError = 'Please complete the required fields.';
      return;
    }
    this.saving = true;
    this.formError = '';
    const request = this.model.id
      ? this.api.put(
          '/resources/' + this.kind + '/' + this.model.id,
          this.model
        )
      : this.api.post('/resources/' + this.kind, this.model);
    request.subscribe(
      () => {
        this.saving = false;
        this.editing = false;
        this.message = 'Your changes have been saved.';
        this.feedback.saved(this.message);
        this.load();
      },
      (e) => {
        this.saving = false;
        this.formError = this.api.message(e);
      }
    );
  }
  review(row: any, status: string) {
    if (this.saving) {
      return;
    }
    this.saving = true;
    this.api.put('/requests/' + row.id + '/review', { status }).subscribe(
      () => {
        this.saving = false;
        this.message = 'Request ' + status + '.';
        this.feedback.saved(this.message);
        this.load();
      },
      (e) => {
        this.saving = false;
        this.error = this.api.message(e);
      }
    );
  }
  titleValue = titleValue;
  get selectedDetails() {
    return detailRows(this.selected);
  }
  viewRecord(row: any) {
    this.selected = row;
    revealDetails('record-details');
  }
  display(row: any, key: string) {
    if (key === 'loginType')
      return (
        ({ '1': 'Normal', '2': 'Settings', '3': 'Social' } as any)[
          String(row[key])
        ] || displayValue(row[key], key)
      );
    return displayValue(row[key], key);
  }
  initials(row: any) {
    return (
      (row.firstName || row.name || '?').charAt(0) +
      (row.lastName || '').charAt(0)
    ).toUpperCase();
  }
  exportCsv() {
    const headers =
      this.kind === 'employees'
        ? [
            ['firstName', 'First name'],
            ['lastName', 'Last name'],
            ...this.config.columns,
          ]
        : [['name', 'Name'], ...this.config.columns];
    const escape = (v: any) =>
      '"' +
      String(v == null ? '' : v)
        .replace(/^[=+@-]/, "'")
        .replace(/"/g, '""') +
      '"';
    const csv = [
      headers.map((h: any) => escape(h[1])).join(','),
      ...this.rows.map((row) =>
        headers.map((h: any) => escape(this.display(row, h[0]))).join(',')
      ),
    ].join('\r\n');
    const url = URL.createObjectURL(
      new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = this.kind + '-page-' + this.page + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
    if (this.request) {
      this.request.unsubscribe();
    }
    this.searchChanges.complete();
  }
}
