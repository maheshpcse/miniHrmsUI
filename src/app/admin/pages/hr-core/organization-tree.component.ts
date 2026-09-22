import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortalService } from '../../../api-services/portal.service';
import { titleValue } from '../../../ui/presentation';
@Component({
  selector: 'app-organization-tree',
  template: ` <div class="page-heading">
      <div>
        <span class="eyebrow">CONNECTED BY PEOPLE</span>
        <h1>Your organization</h1>
        <p>Reporting relationships, shaped around your role and your team.</p>
      </div>
      <div class="heading-actions">
        <a
          class="button secondary"
          routerLink="/admin/hr/people"
          *ngIf="canManage"
          >Manage reporting</a
        >
      </div>
    </div>
    <ui-state [loading]="loading" [error]="error" (retry)="load()"></ui-state>
    <section class="panel hierarchy-panel" *ngIf="!loading && !error">
      <div class="hierarchy-heading">
        <div>
          <span class="eyebrow">{{ scope }}</span>
          <h2>A clear view of how we connect</h2>
          <p>{{ nodes.length }} people in your permitted reporting network.</p>
        </div>
        <div class="core-actions">
          <button class="button secondary" (click)="expandAll()">
            Expand all</button
          ><button class="button secondary" (click)="collapseAll()">
            Collapse all
          </button>
        </div>
      </div>
      <div class="hierarchy-filters">
        <label class="search-field hierarchy-search"
          ><ui-icon name="search"></ui-icon
          ><input
            [(ngModel)]="search"
            (ngModelChange)="filterChanged()"
            placeholder="Find a person, team or role..."
            aria-label="Search reporting network" /></label
        ><ui-select
          ariaLabel="Department"
          [(ngModel)]="department"
          [options]="departmentOptions"
          (ngModelChange)="filterChanged()"
        ></ui-select
        ><ui-select
          ariaLabel="Role"
          [(ngModel)]="roleFilter"
          [options]="roleOptions"
          (ngModelChange)="filterChanged()"
        ></ui-select
        ><ui-select
          ariaLabel="Location"
          [(ngModel)]="location"
          [options]="locationOptions"
          (ngModelChange)="filterChanged()"
        ></ui-select>
      </div>
      <div
        class="hierarchy-tree"
        role="tree"
        aria-label="Reporting relationships"
      >
        <div
          *ngFor="let item of visibleNodes; trackBy: nodeIdentity"
          role="treeitem"
          [attr.aria-level]="item.depth + 1"
          [attr.aria-expanded]="
            hasChildren(item.id) ? !collapsed.has(item.id) : null
          "
          class="hierarchy-branch"
          [style.--depth]="item.depth"
        >
          <div class="hierarchy-person">
            <button
              *ngIf="hasChildren(item.id)"
              class="icon-button"
              [attr.aria-label]="
                (collapsed.has(item.id) ? 'Expand ' : 'Collapse ') +
                item.firstName +
                ' reporting line'
              "
              [attr.aria-expanded]="!collapsed.has(item.id)"
              (click)="toggle(item.id)"
            >
              <span aria-hidden="true">{{
                collapsed.has(item.id) ? '+' : '−'
              }}</span></button
            ><span class="hierarchy-leaf" *ngIf="!hasChildren(item.id)"></span
            ><span class="hierarchy-avatar" aria-hidden="true">{{
              initials(item)
            }}</span>
            <div class="hierarchy-name">
              <strong>{{ item.firstName }} {{ item.lastName }}</strong
              ><span>{{ item.designation || role(item.roleName) }}</span
              ><small
                >{{ item.department
                }}<ng-container *ngIf="item.location">
                  · {{ item.location }}</ng-container
                ></small
              >
            </div>
            <span class="hierarchy-role">{{ role(item.roleName) }}</span
            ><span *ngIf="hasChildren(item.id)" class="hierarchy-count"
              >{{ children(item.id).length }} direct</span
            >
          </div>
        </div>
      </div>
      <div class="core-empty" *ngIf="!visibleNodes.length">
        <h2>No matching people</h2>
        <p>Try a different name or department.</p>
      </div>
    </section>`,
})
export class OrganizationTreeComponent implements OnInit, OnDestroy {
  nodes: any[] = [];
  collapsed = new Set<number>();
  search = '';
  department = '';
  roleFilter = '';
  location = '';
  departmentOptions: any[] = [];
  roleOptions: any[] = [];
  locationOptions: any[] = [];
  visibleNodes: any[] = [];
  private childMap = new Map<number, any[]>();
  scope = '';
  loading = true;
  error = '';
  canManage = false;
  request: Subscription;
  context: Subscription;
  role = titleValue;
  constructor(private api: PortalService) {}
  ngOnInit() {
    this.load();
    this.context = this.api.get('/core/context').subscribe(
      (c) => (this.canManage = c.canManage),
      () => {}
    );
  }
  load() {
    if (this.request) this.request.unsubscribe();
    this.loading = true;
    this.error = '';
    this.request = this.api.get('/core/hierarchy').subscribe(
      (d) => {
        this.nodes = d.nodes.map((n) => ({
          ...n,
          id: Number(n.id),
          managerId: n.managerId ? Number(n.managerId) : null,
        }));
        this.childMap.clear();
        this.nodes.forEach((n) => {
          const children = this.childMap.get(n.managerId) || [];
          children.push(n);
          this.childMap.set(n.managerId, children);
        });
        const options = (key: string, label: string) => [
          { value: '', label },
          ...Array.from(
            new Set<string>(this.nodes.map((n) => n[key]).filter(Boolean))
          )
            .sort()
            .map((value) => ({ value, label: this.role(value) })),
        ];
        this.departmentOptions = options('department', 'All Departments');
        this.roleOptions = options('roleName', 'All Roles');
        this.locationOptions = options('location', 'All Locations');
        this.rebuild();
        this.scope = d.scope;
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        this.error = this.api.message(e);
      }
    );
  }
  children(id: number) {
    return this.childMap.get(id) || [];
  }
  hasChildren(id: number) {
    return this.children(id).length > 0;
  }
  initials(n: any) {
    return (
      (n.firstName || '').charAt(0) + (n.lastName || '').charAt(0)
    ).toUpperCase();
  }
  nodeIdentity(_: number, node: any) {
    return node.id;
  }
  toggle(id: number) {
    this.collapsed.has(id) ? this.collapsed.delete(id) : this.collapsed.add(id);
    this.rebuild();
  }
  expandAll() {
    this.collapsed.clear();
    this.rebuild();
  }
  collapseAll() {
    this.nodes.forEach((n) => {
      if (this.hasChildren(n.id)) this.collapsed.add(n.id);
    });
    this.rebuild();
  }
  filterChanged() {
    this.collapsed.clear();
    this.rebuild();
  }
  private rebuild() {
    const byId = new Map<number, any>(
      this.nodes.map((n) => [n.id, n] as [number, any])
    );
    const query = this.search.trim().toLowerCase();
    const included = new Set<number>();
    this.nodes.forEach((n) => {
      if (
        (!query ||
          [n.firstName, n.lastName, n.department, n.roleName, n.designation]
            .join(' ')
            .toLowerCase()
            .includes(query)) &&
        (!this.department || n.department === this.department) &&
        (!this.roleFilter || n.roleName === this.roleFilter) &&
        (!this.location || n.location === this.location)
      ) {
        let current = n;
        while (current && !included.has(current.id)) {
          included.add(current.id);
          current = byId.get(current.managerId);
        }
      }
    });
    const found: any[] = [],
      seen = new Set<number>();
    const visit = (node: any, depth: number) => {
      if (seen.has(node.id) || !included.has(node.id)) return;
      seen.add(node.id);
      found.push({ ...node, depth });
      if (!this.collapsed.has(node.id))
        this.children(node.id).forEach((child) => visit(child, depth + 1));
    };
    this.nodes
      .filter((n) => !byId.has(n.managerId))
      .forEach((n) => visit(n, 0));
    this.visibleNodes = found;
  }
  ngOnDestroy() {
    if (this.request) this.request.unsubscribe();
    if (this.context) this.context.unsubscribe();
  }
}
