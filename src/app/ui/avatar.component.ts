import { Component, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'ui-avatar',
  template: `<span class="person-avatar" [class.large]="large"
    ><img
      *ngIf="person?.avatarDataUrl && !failed"
      [src]="person.avatarDataUrl"
      [alt]="(person.firstName || 'Employee') + ' profile photo'"
      (error)="failed = true"
    /><span *ngIf="!person?.avatarDataUrl || failed" aria-hidden="true">{{
      initials
    }}</span></span
  >`,
})
export class AvatarComponent implements OnChanges {
  @Input() person: any = {};
  @Input() large = false;
  failed = false;
  get initials() {
    return (
      (this.person.firstName || '?').charAt(0) +
      (this.person.lastName || '').charAt(0)
    ).toUpperCase();
  }
  ngOnChanges() {
    this.failed = false;
  }
}
