import { Component, OnDestroy, HostListener } from '@angular/core';
import { FeedbackService } from './feedback.service';
@Component({
  selector: 'ui-feedback',
  template: ` <div
    *ngIf="message"
    class="feedback-backdrop"
    [class.closing]="closing"
    (click)="close()"
  >
    <section
      class="feedback-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      aria-describedby="feedback-message"
      cdkTrapFocus
      [cdkTrapFocusAutoCapture]="true"
      (click)="$event.stopPropagation()"
    >
      <span class="feedback-check"><ui-icon name="check"></ui-icon></span>
      <h2 id="feedback-title">All set</h2>
      <p id="feedback-message">{{ message }}</p>
      <button
        type="button"
        class="button primary"
        cdkFocusInitial
        (click)="close()"
      >
        Done
      </button>
    </section>
  </div>`,
})
export class FeedbackComponent implements OnDestroy {
  message = '';
  closing = false;
  timer: any;
  subscription = this.feedback.messages.subscribe((message) => {
    clearTimeout(this.timer);
    this.closing = false;
    this.message = message;
  });
  constructor(private feedback: FeedbackService) {}
  @HostListener('document:keydown.escape') close() {
    if (!this.message) {
      return;
    }
    this.closing = true;
    this.timer = setTimeout(() => {
      this.message = '';
      this.closing = false;
    }, 160);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearTimeout(this.timer);
  }
}
