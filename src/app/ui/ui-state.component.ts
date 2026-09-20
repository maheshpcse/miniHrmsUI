import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "ui-state",
  template: `<div *ngIf="loading" class="state-box" role="status">
      <span class="loader"></span>
      <p>Getting everything ready…</p>
    </div>
    <div *ngIf="!loading && error" class="state-box error-state" role="alert">
      <ui-icon name="request"></ui-icon>
      <h3>Something needs attention</h3>
      <p>{{ error }}</p>
      <button type="button" class="button secondary" (click)="retry.emit()">
        Try again <ui-icon name="arrow"></ui-icon>
      </button>
    </div>
    <div *ngIf="!loading && !error && empty" class="state-box">
      <ui-icon name="people"></ui-icon>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>`,
})
export class UiStateComponent {
  @Input() loading = false;
  @Input() error = "";
  @Input() empty = false;
  @Input() title = "A fresh start";
  @Input() description = "There are no records here yet.";
  @Output() retry = new EventEmitter<void>();
}
