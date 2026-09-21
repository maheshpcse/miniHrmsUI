import { titleValue } from './presentation';
import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';

let nextId = 0;
@Component({
  selector: 'ui-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: ` <button
      #trigger
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      type="button"
      class="select-trigger"
      role="combobox"
      aria-haspopup="listbox"
      [attr.aria-label]="ariaLabel"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="open ? id : null"
      [attr.aria-activedescendant]="open ? id + '-' + active : null"
      [disabled]="disabled"
      (click)="toggle()"
      (keydown)="key($event)"
      (blur)="touched()"
      (mouseenter)="pauseClose()"
      (mouseleave)="scheduleClose()"
    >
      <span>{{ label }}</span
      ><ui-icon name="chevron"></ui-icon>
    </button>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="open"
      [cdkConnectedOverlayWidth]="width"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      [cdkConnectedOverlayScrollStrategy]="scrollStrategy"
      (backdropClick)="close()"
      (detach)="open = false"
    >
      <div
        class="select-options"
        (mouseenter)="pauseClose()"
        (mouseleave)="scheduleClose()"
        role="listbox"
        [id]="id"
        [attr.aria-label]="ariaLabel"
      >
        <div
          *ngFor="let option of options; let i = index"
          role="option"
          [id]="id + '-' + i"
          [attr.aria-selected]="value === option.value"
          [class.active]="active === i"
          [class.chosen]="value === option.value"
          (mouseenter)="active = i"
          (mousedown)="$event.preventDefault()"
          (click)="choose(i)"
        >
          {{ titleValue(option.label)
          }}<ui-icon *ngIf="value === option.value" name="check"></ui-icon>
        </div>
      </div>
    </ng-template>`,
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  titleValue = titleValue;
  closeTimer: any;
  keyboardMode = false;
  pauseClose() {
    clearTimeout(this.closeTimer);
  }
  scheduleClose() {
    this.pauseClose();
    if (this.open && !this.keyboardMode)
      this.closeTimer = setTimeout(() => this.close(), 4000);
  }
  ngOnDestroy() {
    this.pauseClose();
  }
  @Input() options: { value: string; label: string }[] = [];
  @Input() ariaLabel = 'Choose an option';
  @Input() placeholder = 'Choose an option';
  @ViewChild('trigger') trigger: ElementRef<HTMLButtonElement>;
  id = 'hr-select-' + nextId++;
  value = '';
  disabled = false;
  open = false;
  active = 0;
  width = 200;
  scrollStrategy = this.overlay.scrollStrategies.reposition();
  changed = (_: string) => {};
  touched = () => {};
  constructor(private overlay: Overlay) {}
  get label() {
    const option = this.options.find((o) => o.value === this.value);
    return titleValue(option ? option.label : this.placeholder);
  }
  writeValue(value: any) {
    this.value = value == null ? '' : String(value);
  }
  registerOnChange(fn: any) {
    this.changed = fn;
  }
  registerOnTouched(fn: any) {
    this.touched = fn;
  }
  setDisabledState(value: boolean) {
    this.disabled = value;
    if (value) {
      this.open = false;
    }
  }
  toggle() {
    if (this.open) {
      this.close();
      return;
    }
    this.width = this.trigger.nativeElement.getBoundingClientRect().width;
    this.active = Math.max(
      0,
      this.options.findIndex((o) => o.value === this.value)
    );
    this.open = true;
    this.keyboardMode = false;
    this.scheduleClose();
  }
  close() {
    this.pauseClose();
    this.open = false;
    this.touched();
    this.trigger.nativeElement.focus();
  }
  choose(index: number) {
    if (!this.options[index]) {
      return;
    }
    this.value = this.options[index].value;
    this.changed(this.value);
    this.close();
  }
  key(event: KeyboardEvent) {
    this.pauseClose();
    this.keyboardMode = true;
    if (event.key === 'Tab') {
      this.open = false;
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }
    if (
      ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)
    ) {
      event.preventDefault();
      if (!this.open) {
        this.toggle();
        this.keyboardMode = true;
        this.pauseClose();
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        this.choose(this.active);
        return;
      }
      this.active =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
          ? this.options.length - 1
          : (this.active +
              (event.key === 'ArrowDown' ? 1 : -1) +
              this.options.length) %
            this.options.length;
    } else if (event.key.length === 1) {
      if (!this.open) {
        this.toggle();
        this.keyboardMode = true;
        this.pauseClose();
      }
      const index = this.options.findIndex(
        (o, i) =>
          i > this.active &&
          o.label.toLowerCase().startsWith(event.key.toLowerCase())
      );
      const first = this.options.findIndex((o) =>
        o.label.toLowerCase().startsWith(event.key.toLowerCase())
      );
      if (index >= 0 || first >= 0) {
        this.active = index >= 0 ? index : first;
      }
    }
    setTimeout(() =>
      document
        .getElementById(this.id + '-' + this.active)
        ?.scrollIntoView({ block: 'nearest' })
    );
  }
}
