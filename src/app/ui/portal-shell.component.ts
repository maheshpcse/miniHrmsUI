import { CORE_MODULES } from '../admin/pages/hr-core/core-config';
import {
  Component,
  Input,
  HostListener,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthAdminService } from '../api-services/auth-admin.service';
import { PortalService } from '../api-services/portal.service';
@Component({
  selector: 'app-portal-shell',
  templateUrl: './portal-shell.component.html',
})
export class PortalShellComponent implements OnDestroy, OnChanges {
  capabilities: any = {};
  capabilityRequest: Subscription;
  shortcuts: any[] = [];
  shortcutRequest: Subscription;
  @Input() authMode = false;
  @Input() homeMode = false;
  mobileOpen = false;
  collapsed = localStorage.getItem('hr-nav-collapsed') === 'true';
  unread = 0;
  notificationUpdates: Subscription;
  notificationPoll: Subscription;
  notificationRequest: Subscription;
  toggleNav() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('hr-nav-collapsed', String(this.collapsed));
  }
  refreshNotifications() {
    if (this.authMode || !this.auth.isLoggedIn() || document.hidden) {
      return;
    }
    if (this.notificationRequest) {
      this.notificationRequest.unsubscribe();
    }
    this.notificationRequest = this.api.get('/notifications/unread').subscribe(
      (data) => (this.unread = data.count),
      () => {}
    );
  }
  @HostListener('window:focus') onFocus() {
    this.refreshNotifications();
  }
  navSearch = '';
  theme = 'hr';
  year = new Date().getFullYear();
  today = new Date();
  subscription: Subscription;
  groups: any[] = [
    {
      label: 'WORKSPACE',
      items: [
        { label: 'Overview', icon: 'grid', url: '/admin/dashboard' },
        {
          label: 'People directory',
          icon: 'people',
          url: '/admin/employees/all-employees',
          permission: 'employees:read',
        },
        {
          label: 'Login activity',
          icon: 'clock',
          url: '/admin/employees/login-history',
          permission: 'employees:read',
        },
        { label: 'Requests', icon: 'request', url: '/admin/requests' },
        { label: 'Notifications', icon: 'bell', url: '/admin/notifications' },
        {
          label: 'Send notification',
          icon: 'mail',
          url: '/admin/notifications/send',
          permission: 'notifications:write',
        },
      ],
    },
    {
      label: 'HR MODULES',
      items: [
        { label: 'Organization', icon: 'people', url: '/admin/organization' },
        { label: 'People operations', icon: 'people', url: '/admin/hr/people' },
        { label: 'Attendance', icon: 'clock', url: '/admin/hr/attendance' },
        { label: 'Leave', icon: 'calendar', url: '/admin/hr/leave' },
        { label: 'Documents', icon: 'request', url: '/admin/hr/documents' },
        { label: 'Notice board', icon: 'mail', url: '/admin/hr/messages' },
        { label: 'Engagement', icon: 'heart', url: '/admin/hr/engagement' },
        { label: 'Events', icon: 'calendar', url: '/admin/hr/events' },
        { label: 'Exit & handover', icon: 'logout', url: '/admin/hr/exit' },
        { label: 'Salary & payslips', icon: 'shield', url: '/admin/hr/salary' },
        { label: 'Approvals', icon: 'request', url: '/admin/hr/approvals' },
      ],
    },
    {
      label: 'YOUR ACCOUNT',
      items: [
        { label: 'My profile', icon: 'people', url: '/admin/profile' },
        {
          label: 'Profile settings',
          icon: 'edit',
          url: '/admin/profile-settings',
        },
        { label: 'Settings', icon: 'settings', url: '/admin/settings' },
      ],
    },
    {
      label: 'CONFIGURATION',
      items: [
        {
          label: 'HR policies',
          icon: 'settings',
          url: '/admin/hr/policies',
          permission: 'hr:manage',
        },
        {
          label: 'HR audit',
          icon: 'shield',
          url: '/admin/hr/audit',
          permission: 'hr:manage',
        },
        {
          label: 'Menus',
          icon: 'menu',
          url: '/admin/forms/menus',
          permission: 'settings:write',
        },
        {
          label: 'Roles',
          icon: 'shield',
          url: '/admin/forms/roles',
          permission: 'settings:write',
        },
        {
          label: 'Permissions',
          icon: 'settings',
          url: '/admin/forms/permissions',
          permission: 'settings:write',
        },
        {
          label: 'Attendance types',
          icon: 'calendar',
          url: '/admin/forms/attendance-types',
          permission: 'settings:write',
        },
        {
          label: 'Leave types',
          icon: 'heart',
          url: '/admin/forms/leave-types',
          permission: 'settings:write',
        },
        {
          label: 'Login encryption',
          icon: 'shield',
          url: '/admin/forms/login-encrypt-decrypt',
          permission: 'settings:write',
        },
      ],
    },
  ];
  constructor(
    public auth: AuthAdminService,
    public router: Router,
    private api: PortalService
  ) {
    this.applyTheme();
    this.notificationUpdates = this.api.updates.subscribe(() =>
      this.refreshNotifications()
    );
    this.notificationPoll = timer(0, 30000).subscribe(() =>
      this.refreshNotifications()
    );
    this.subscription = router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.mobileOpen = false;
        this.refreshNotifications();
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
  }
  ngOnChanges() {
    try {
      const prefs = JSON.parse(
        localStorage.getItem('hr-preferences-' + this.auth.getLoginId()) || '{}'
      );
      document.documentElement.setAttribute(
        'data-motion',
        prefs.motion || 'system'
      );
    } catch (_) {}
    if (!this.authMode && this.auth.isLoggedIn()) {
      this.refreshNotifications();
      if (this.capabilityRequest) this.capabilityRequest.unsubscribe();
      this.capabilityRequest = this.api.get('/core/context').subscribe(
        (c) => (this.capabilities = c),
        () => {}
      );
      if (this.shortcutRequest) {
        this.shortcutRequest.unsubscribe();
      }
      this.shortcutRequest = this.api.get('/shortcuts').subscribe(
        (items) =>
          (this.shortcuts = items.filter(
            (item) => !item.path.includes('/learn')
          )),
        () => (this.shortcuts = [])
      );
    }
  }
  get name() {
    return sessionStorage.getItem('firstName') || 'Your workspace';
  }
  get initials() {
    return this.name.charAt(0).toUpperCase();
  }
  get section() {
    return 'Human resources';
  }
  isMenuActive(item: any) {
    const path = this.router.url.split(/[?#]/)[0];
    return (
      path === item.url ||
      (item.url.startsWith('/admin/hr/') && path.startsWith(item.url + '/'))
    );
  }
  sections(item: any) {
    const module = CORE_MODULES[item.url.split('/').pop()];
    return module
      ? module.tabs.filter(
          (t) =>
            (!t.manage || this.capabilities.canManage) &&
            (!t.payroll || this.capabilities.canPayroll)
        )
      : [];
  }
  sectionActive(item: any, key: string) {
    return (
      this.isMenuActive(item) &&
      this.router.parseUrl(this.router.url).queryParams.tab === key
    );
  }
  visible(item: any) {
    return (
      (item.url !== '/admin/hr/approvals' || this.capabilities.canReview) &&
      (!item.permission || this.auth.allowed(item.permission)) &&
      item.label.toLowerCase().includes(this.navSearch.toLowerCase())
    );
  }
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }
  logout() {
    this.api.post('/auth/logout', {}).subscribe(
      () => this.auth.isLoggedOut(),
      () => this.auth.isLoggedOut()
    );
  }
  @HostListener('document:keydown.escape') close() {
    this.mobileOpen = false;
  }
  ngOnDestroy() {
    if (this.capabilityRequest) this.capabilityRequest.unsubscribe();
    this.notificationUpdates.unsubscribe();
    this.notificationPoll.unsubscribe();
    if (this.notificationRequest) {
      this.notificationRequest.unsubscribe();
    }
    this.subscription.unsubscribe();
    if (this.shortcutRequest) {
      this.shortcutRequest.unsubscribe();
    }
  }
}
