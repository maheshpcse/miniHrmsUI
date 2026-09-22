import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Subscription, combineLatest, forkJoin } from 'rxjs';
import { PortalService } from '../../../api-services/portal.service';
import { FeedbackService } from '../../../ui/feedback.service';
import { fieldLabel, displayValue } from '../../../ui/presentation';
import { CORE_MODULES, CoreModule, CoreTab, CoreField } from './core-config';
@Component({
  selector: 'app-hr-core',
  templateUrl: './core-page.component.html',
})
export class CorePageComponent implements OnInit, OnDestroy {
  @ViewChild('detailPanel') detailPanel: ElementRef;
  currentUserId = Number(sessionStorage.getItem('userId'));
  modules = CORE_MODULES;
  module: CoreModule;
  moduleKey = '';
  tab: CoreTab;
  context: any = { people: [], leaveTypes: [] };
  rows: any[] = [];
  count = 0;
  page = 1;
  query = '';
  loading = true;
  workspaceView = 'dashboard';
  dashboard: any[] = [];
  dashboardLoading = false;
  dashboardRequest: Subscription;
  reportLoading = false;
  contextReady = false;
  error = '';
  formError = '';
  saving = false;
  formOpen = false;
  model: any = {};
  selected: any = null;
  extra: any[] = [];
  punch: any = null;
  file: File;
  importText = '';
  importing = false;
  sortKey = '';
  descending = false;
  label = fieldLabel;
  value = displayValue;
  subscriptions = new Subscription();
  request: Subscription;
  contextRequest: Subscription;
  formOptions: any = {};
  constructor(
    public api: PortalService,
    private route: ActivatedRoute,
    private router: Router,
    private feedback: FeedbackService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.subscriptions.add(
      combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(
        ([params, query]) => {
          if (this.dashboardRequest) this.dashboardRequest.unsubscribe();
          if (this.request) this.request.unsubscribe();
          if (this.contextRequest) this.contextRequest.unsubscribe();
          this.moduleKey = params.get('module') || 'attendance';
          this.module = CORE_MODULES[this.moduleKey];
          this.workspaceView =
            query.get('view') || (query.has('tab') ? 'reports' : 'dashboard');
          if (!['dashboard', 'reports', 'entry'].includes(this.workspaceView))
            this.workspaceView = 'dashboard';
          this.selected = null;
          this.formOpen = false;
          this.page = 1;
          this.query = '';
          if (!this.module) {
            this.error = 'This HR module is not available.';
            this.loading = false;
            return;
          }
          const selectTab = () => {
            this.tab =
              this.tabs.find((t) => t.key === query.get('tab')) || this.tabs[0];
            this.loading = false;
            if (!this.tab) {
              this.error = 'You do not have access to this area.';
              return;
            }
            this.rows = [];
            this.count = 0;
            this.sortKey = '';
            this.descending = false;
            if (this.workspaceView === 'dashboard') this.loadDashboard();
            else if (this.workspaceView === 'entry' && this.canCreate)
              this.openForm();
            else {
              this.workspaceView = 'reports';
              this.load();
            }
          };
          if (this.contextReady) {
            selectTab();
            return;
          }
          this.loading = true;
          this.subscriptions.add(
            (this.contextRequest = this.api.get('/core/context').subscribe(
              (c) => {
                this.context = c;
                this.contextReady = true;
                selectTab();
              },
              (e) => {
                this.error = this.api.message(e);
                this.loading = false;
              }
            ))
          );
        }
      )
    );
  }
  get tabs() {
    return this.module
      ? this.module.tabs.filter(
          (t) =>
            (this.moduleKey !== 'approvals' || this.context.canReview) &&
            (!t.manage || this.context.canManage) &&
            (!t.payroll || this.context.canPayroll)
        )
      : [];
  }
  get canCreate() {
    return (
      this.tab &&
      this.tab.fields &&
      (!(
        this.tab.create === 'manage' || this.tab.create === 'leave/adjustments'
      ) ||
        this.context.canManage)
    );
  }
  get fields() {
    return (this.tab.fields || [])
      .filter(
        (f) =>
          this.tab.endpoint !== 'policies' ||
          ![
            'timezone',
            'full_day_minutes',
            'half_day_minutes',
            'weekend_policy',
            'notice_days',
          ].includes(f.key) ||
          (
            {
              Attendance: ['timezone', 'full_day_minutes', 'half_day_minutes'],
              Leave: ['weekend_policy'],
              Exit: ['notice_days'],
            }[this.model.module] || []
          ).includes(f.key)
      )
      .filter(
        (f) =>
          this.context.canManage ||
          !['employee_id', 'visibility', 'ack_required'].includes(f.key) ||
          this.tab.endpoint === 'recognition'
      );
  }
  showDashboard() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: 'dashboard' },
    });
  }
  loadDashboard() {
    if (this.dashboardRequest) this.dashboardRequest.unsubscribe();
    this.dashboardLoading = true;
    this.error = '';
    this.dashboardRequest = forkJoin(
      this.tabs.map((t) => this.api.get('/core/' + t.endpoint, { limit: 3 }))
    ).subscribe(
      (results) => {
        this.dashboard = results.map((data, index) => ({
          tab: this.tabs[index],
          count:
            data.count === undefined ? (data.list || []).length : data.count,
          recent: data.list || [],
        }));
        this.dashboardLoading = false;
      },
      (e) => {
        this.dashboardLoading = false;
        this.error = this.api.message(e);
      }
    );
  }
  startEntry(t: CoreTab = this.tab) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: t.key, view: 'entry' },
    });
  }
  closeEntry() {
    this.changeTab(this.tab);
  }
  changeTab(t: CoreTab) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: t.key, view: 'reports' },
    });
  }
  load() {
    if (!this.tab) return;
    if (this.request) this.request.unsubscribe();
    this.reportLoading = true;
    this.error = '';
    this.request = this.api
      .get('/core/' + this.tab.endpoint, { page: this.page, q: this.query })
      .subscribe(
        (data) => {
          this.rows = data.list || [];
          this.count = data.count === undefined ? this.rows.length : data.count;
          this.reportLoading = false;
          if (this.moduleKey === 'attendance')
            this.subscriptions.add(
              this.api.get('/core/attendance/state').subscribe(
                (s) => (this.punch = s.last),
                (e) => (this.error = this.api.message(e))
              )
            );
        },
        (e) => {
          this.reportLoading = false;
          this.error = this.api.message(e);
        }
      );
  }
  search() {
    this.page = 1;
    this.load();
  }
  get sortedRows() {
    if (!this.sortKey) return this.rows;
    return this.rows
      .slice()
      .sort(
        (a, b) =>
          String(this.cell(a, this.sortKey)).localeCompare(
            String(this.cell(b, this.sortKey)),
            undefined,
            { numeric: true }
          ) * (this.descending ? -1 : 1)
      );
  }
  sort(key: string) {
    this.descending = this.sortKey === key ? !this.descending : false;
    this.sortKey = key;
  }
  person(id: any) {
    const p = this.context.people.find((x) => String(x.id) === String(id));
    return p
      ? [p.firstName, p.lastName].filter(Boolean).join(' ')
      : 'Employee ' + id;
  }
  cell(row: any, key: string) {
    if (row[key] === null || row[key] === undefined) return '—';
    if (['employee_id', 'owner_id', 'actor_id', 'manager_id'].includes(key))
      return this.person(row[key]);
    if (key === 'leave_type_id') {
      const t = this.context.leaveTypes.find(
        (x) => String(x.id) === String(row[key])
      );
      return t ? t.name : 'Leave Type';
    }
    if (
      typeof row[key] === 'boolean' ||
      ['paid', 'allow_negative'].includes(key)
    )
      return row[key] ? 'Yes' : 'No';
    if (/date|_at|_from|_to|_on|lwd/.test(key)) {
      const d = new Date(row[key]);
      if (!isNaN(d.getTime()))
        return d.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          ...((key.endsWith('_at')
            ? { hour: '2-digit', minute: '2-digit' }
            : {}) as any),
        });
    }
    if (typeof row[key] === 'object') return 'View details';
    if (
      [
        'status',
        'audience',
        'visibility',
        'response',
        'module',
        'action',
      ].includes(key)
    )
      return fieldLabel(String(row[key]));
    return String(row[key]);
  }
  options(f: CoreField) {
    if (f.options)
      return f.options.map((o) => ({ ...o, label: fieldLabel(o.label) }));
    if (f.source === 'people')
      return this.context.people.map((p) => ({
        value: String(p.id),
        label:
          [p.firstName, p.lastName].filter(Boolean).join(' ') + ' · ' + p.empId,
      }));
    if (f.source === 'leaveTypes')
      return this.context.leaveTypes.map((t) => ({
        value: String(t.id),
        label: t.name,
      }));
    return this.formOptions[f.source] || [];
  }
  openForm() {
    this.model = {
      timezone: this.context.organization.timezone,
      leave_year: new Date().getFullYear(),
      privacy_threshold: 5,
      anonymous: true,
      visibility: 'private',
      audience: 'personal',
    };
    this.formError = '';
    this.file = null;
    this.formOpen = true;
    this.workspaceView = 'entry';
    for (const f of this.tab.fields || [])
      if (['events', 'payslips'].includes(f.source)) {
        this.subscriptions.add(
          this.api
            .get('/core/' + (f.source === 'payslips' ? 'salary' : 'events'), {
              limit: 100,
            })
            .subscribe(
              (d) =>
                (this.formOptions[f.source] = d.list.map((r) => ({
                  value: String(r.id),
                  label: r.title || r.period + ' · ' + r.external_reference,
                }))),
              (e) => (this.formError = this.api.message(e))
            )
        );
      }
  }
  openVersion(row: any) {
    this.openForm();
    this.model = {
      ...row,
      document_id: row.id,
      expires_on: row.expires_on ? String(row.expires_on).slice(0, 10) : '',
    };
  }
  pickFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }
  save(form: NgForm) {
    if (this.saving) return;
    this.formError = '';
    if (form.invalid) {
      Object.keys(form.controls).forEach((k) =>
        form.controls[k].markAsTouched()
      );
      this.formError = 'Complete the required fields.';
      return;
    }
    let body: any = { ...this.model };
    for (const f of this.fields) {
      if (f.type === 'datetime-local' && body[f.key])
        body[f.key] = new Date(body[f.key]).toISOString();
    }
    if (this.tab.endpoint === 'surveys')
      body.options = String(body.options || '')
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean);
    if (this.tab.endpoint === 'documents') {
      if (!this.file || this.file.size > 10 * 1024 * 1024) {
        this.formError = 'Choose a document up to 10 MB.';
        return;
      }
      const multipart = new FormData();
      Object.keys(body).forEach((k) => {
        if (body[k] !== undefined && body[k] !== null)
          multipart.append(k, String(body[k]));
      });
      multipart.append('file', this.file);
      body = multipart;
    }
    this.saving = true;
    const endpoint =
      this.tab.create && this.tab.create !== 'manage'
        ? this.tab.create
        : this.tab.endpoint;
    this.subscriptions.add(
      this.api.post('/core/' + endpoint, body).subscribe(
        () => {
          this.saving = false;
          this.formOpen = false;
          this.feedback.saved('Your changes have been saved.');
          this.changeTab(this.tab);
          if (this.tab.endpoint === 'leave/types')
            this.subscriptions.add(
              this.api.get('/core/context').subscribe((c) => (this.context = c))
            );
        },
        (e) => {
          this.saving = false;
          this.formError = this.api.message(e);
        }
      )
    );
  }
  act(path: string, body: any = {}, reload = true) {
    if (this.saving) return;
    this.saving = true;
    this.formError = '';
    this.subscriptions.add(
      this.api.post('/core/' + path, body).subscribe(
        () => {
          this.saving = false;
          this.feedback.saved('Your update has been saved.');
          if (reload) this.load();
          if (this.selected && this.tab.action === 'exit')
            this.view(this.selected);
        },
        (e) => {
          this.saving = false;
          this.formError = this.api.message(e);
        }
      )
    );
  }
  punchAction(type: string) {
    const key =
      Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    this.act('attendance/punch', { event_type: type, correlation_id: key });
  }
  canPunch(type: string) {
    const map: any = {
      OUT: ['IN'],
      IN: ['OUT', 'BREAK_OUT'],
      BREAK_OUT: ['BREAK_IN'],
      BREAK_IN: ['OUT', 'BREAK_OUT'],
    };
    return (map[this.punch ? this.punch.event_type : 'OUT'] || []).includes(
      type
    );
  }
  view(row: any) {
    this.selected = row.rules
      ? {
          ...row,
          ...(typeof row.rules === 'string'
            ? JSON.parse(row.rules)
            : row.rules),
        }
      : row;
    this.extra = [];
    if (this.tab.action === 'salary')
      this.subscriptions.add(
        this.api.get('/core/salary/' + row.id).subscribe(
          (d) => {
            this.selected = d;
            this.focusDetail();
          },
          (e) => (this.formError = this.api.message(e))
        )
      );
    else if (this.tab.action === 'exit')
      this.subscriptions.add(
        this.api.get('/core/exit/' + row.id + '/clearance').subscribe(
          (d) => {
            this.extra = d.list;
            this.focusDetail();
          },
          (e) => (this.formError = this.api.message(e))
        )
      );
    else this.focusDetail();
  }
  focusDetail() {
    setTimeout(() => {
      if (this.detailPanel) {
        this.detailPanel.nativeElement.scrollIntoView({
          behavior: matchMedia('(prefers-reduced-motion:reduce)').matches
            ? 'auto'
            : 'smooth',
          block: 'start',
        });
        this.detailPanel.nativeElement.focus({ preventScroll: true });
      }
    }, 0);
  }
  get detailKeys() {
    return this.selected
      ? Object.keys(this.selected).filter(
          (k) =>
            ![
              'id',
              'employee',
              'components',
              'taxLines',
              'checksum',
              'metadata',
              'options',
              'results',
              'input_snapshot',
              'created_by',
              'imported_by',
              'reviewer_id',
              'entity_id',
              'result_id',
              'leave_type_id',
            ].includes(k) &&
            !Array.isArray(this.selected[k]) &&
            typeof this.selected[k] !== 'object'
        )
      : [];
  }
  download(row: any) {
    this.subscriptions.add(
      this.http
        .get(this.api.base + '/core/documents/' + row.id + '/download', {
          responseType: 'blob',
        })
        .subscribe(
          (blob) => {
            const url = URL.createObjectURL(blob),
              a = document.createElement('a');
            a.href = url;
            a.download = row.title;
            a.click();
            URL.revokeObjectURL(url);
          },
          (e) => (this.formError = this.api.message(e))
        )
    );
  }
  importPayroll() {
    if (this.saving) return;
    let payload;
    try {
      payload = JSON.parse(this.importText);
    } catch {
      this.formError = 'Paste valid finalized payroll JSON.';
      return;
    }
    this.act('salary/import', payload);
  }
  sampleImport() {
    this.importText = JSON.stringify(
      {
        status: 'FINALIZED',
        employee_id: this.context.people[0] ? this.context.people[0].id : 1,
        external_reference: 'PAY-2026-09-001',
        source_system: 'Approved Payroll Export',
        period: '2026-09',
        currency: 'INR',
        gross: '10000.0000',
        deductions: '500.0000',
        tax: '0.0000',
        reimbursements: '0.0000',
        employer_contributions: '0.0000',
        net: '9500.0000',
        input_snapshot: { source_run: 'REPLACE-WITH-FINALIZED-RUN' },
        components: [
          {
            code: 'BASIC',
            name: 'Basic Salary',
            type: 'EARNING',
            amount: '10000.0000',
          },
          {
            code: 'DEDUCTION',
            name: 'Employee Deduction',
            type: 'DEDUCTION',
            amount: '500.0000',
          },
        ],
      },
      null,
      2
    );
  }
  export() {
    const columns = this.tab.columns,
      csv = [
        columns.map(fieldLabel),
        ...this.sortedRows.map((r) => columns.map((k) => this.cell(r, k))),
      ]
        .map((row) =>
          row
            .map(
              (v) =>
                '"' +
                String(v)
                  .replace(/^[=+@-]/, "'$&")
                  .replace(/"/g, '""') +
                '"'
            )
            .join(',')
        )
        .join('\r\n');
    const url = URL.createObjectURL(
        new Blob([csv], { type: 'text/csv;charset=utf-8' })
      ),
      a = document.createElement('a');
    a.href = url;
    a.download = this.tab.key + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
  print() {
    window.print();
  }
  ngOnDestroy() {
    if (this.dashboardRequest) this.dashboardRequest.unsubscribe();
    this.subscriptions.unsubscribe();
    if (this.contextRequest) this.contextRequest.unsubscribe();
    if (this.request) this.request.unsubscribe();
  }
}
