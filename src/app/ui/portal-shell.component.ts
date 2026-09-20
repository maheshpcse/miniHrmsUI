import {
  Component,
  Input,
  HostListener,
  OnDestroy,
  OnChanges,
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthAdminService } from "../api-services/auth-admin.service";
import { PortalService } from "../api-services/portal.service";
@Component({
  selector: "app-portal-shell",
  templateUrl: "./portal-shell.component.html",
})
export class PortalShellComponent implements OnDestroy, OnChanges {
  shortcuts: any[] = [];
  shortcutRequest: Subscription;
  @Input() authMode = false;
  mobileOpen = false;
  navSearch = "";
  theme = "hr";
  year = new Date().getFullYear();
  today = new Date();
  subscription: Subscription;
  groups: any[] = [
    {
      label: "WORKSPACE",
      items: [
        { label: "Overview", icon: "grid", url: "/admin/dashboard" },
        {
          label: "People directory",
          icon: "people",
          url: "/admin/employees/all-employees",
          permission: "employees:read",
        },
        {
          label: "Login activity",
          icon: "clock",
          url: "/admin/employees/login-history",
          permission: "employees:read",
        },
        { label: "Requests", icon: "request", url: "/admin/requests" },
        { label: "Notifications", icon: "bell", url: "/admin/notifications" },
        {
          label: "Send notification",
          icon: "mail",
          url: "/admin/notifications/send",
          permission: "notifications:write",
        },
      ],
    },
    {
      label: "CONFIGURATION",
      items: [
        {
          label: "Menus",
          icon: "menu",
          url: "/admin/forms/menus",
          permission: "settings:write",
        },
        {
          label: "Roles",
          icon: "shield",
          url: "/admin/forms/roles",
          permission: "settings:write",
        },
        {
          label: "Permissions",
          icon: "settings",
          url: "/admin/forms/permissions",
          permission: "settings:write",
        },
        {
          label: "Attendance types",
          icon: "calendar",
          url: "/admin/forms/attendance-types",
          permission: "settings:write",
        },
        {
          label: "Leave types",
          icon: "heart",
          url: "/admin/forms/leave-types",
          permission: "settings:write",
        },
        {
          label: "Login encryption",
          icon: "shield",
          url: "/admin/forms/login-encrypt-decrypt",
          permission: "settings:write",
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
    this.subscription = router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.mobileOpen = false;
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  }
  ngOnChanges() {
    if (!this.authMode && this.auth.isLoggedIn()) {
      if (this.shortcutRequest) {
        this.shortcutRequest.unsubscribe();
      }
      this.shortcutRequest = this.api.get("/shortcuts").subscribe(
        (items) =>
          (this.shortcuts = items.filter(
            (item) => !item.path.includes("/learn")
          )),
        () => (this.shortcuts = [])
      );
    }
  }
  get name() {
    return sessionStorage.getItem("firstName") || "Your workspace";
  }
  get initials() {
    return this.name.charAt(0).toUpperCase();
  }
  get section() {
    return "Human resources";
  }
  visible(item: any) {
    return (
      (!item.permission || this.auth.allowed(item.permission)) &&
      item.label.toLowerCase().includes(this.navSearch.toLowerCase())
    );
  }
  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);
  }
  logout() {
    this.api.post("/auth/logout", {}).subscribe(
      () => this.auth.isLoggedOut(),
      () => this.auth.isLoggedOut()
    );
  }
  @HostListener("document:keydown.escape") close() {
    this.mobileOpen = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.shortcutRequest) {
      this.shortcutRequest.unsubscribe();
    }
  }
}
