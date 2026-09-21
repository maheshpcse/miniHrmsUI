import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostListener,
  OnDestroy,
  OnChanges,
} from '@angular/core';
let tooltipId = 0;
@Directive({ selector: '[uiTooltip]' })
export class TooltipDirective implements OnDestroy, OnChanges {
  @Input() uiTooltip = '';
  @Input() uiTooltipDisabled = false;
  private popup: HTMLElement;
  private timer: any;
  private oldDescription = '';
  private listeners: (() => void)[] = [];
  private keyboardIntent = false;
  private hovered = false;
  private scrollHandler = () => this.hide();
  constructor(
    private host: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}
  private get enabled() {
    const element = this.host.nativeElement;
    if (
      this.uiTooltipDisabled ||
      element.closest('.workspace-header') ||
      element.hasAttribute('disabled')
    )
      return false;
    const nav = element.closest('.workspace-nav');
    return (
      !!nav &&
      (nav.classList.contains('collapsed') &&
        matchMedia('(min-width:768px)').matches)
    );
  }
  ngOnChanges() {
    this.hide();
  }
  @HostListener('document:keydown', ['$event']) onKey(event: KeyboardEvent) {
    if (event.key === 'Tab') this.keyboardIntent = true;
  }
  @HostListener('document:pointerdown') onPointer() {
    this.keyboardIntent = false;
    this.hide();
  }
  @HostListener('mouseenter') enter() {
    this.hovered = true;
    this.queue();
  }
  @HostListener('focusin') focus() {
    if (this.keyboardIntent) this.queue();
  }
  private queue() {
    clearTimeout(this.timer);
    if (!this.enabled) return;
    this.timer = setTimeout(() => {
      if (
        this.enabled &&
        (this.hovered ||
          (this.keyboardIntent &&
            document.activeElement === this.host.nativeElement))
      )
        this.show();
    }, 250);
  }
  private show() {
    if (this.popup) return;
    const text =
      this.uiTooltip || this.host.nativeElement.getAttribute('aria-label');
    if (!text) return;
    this.popup = this.renderer.createElement('span');
    const id = 'hr-tooltip-' + tooltipId++;
    this.renderer.setAttribute(this.popup, 'id', id);
    this.renderer.setAttribute(this.popup, 'role', 'tooltip');
    this.renderer.addClass(this.popup, 'hr-tooltip');
    this.renderer.appendChild(this.popup, this.renderer.createText(text));
    this.renderer.appendChild(document.body, this.popup);
    this.oldDescription =
      this.host.nativeElement.getAttribute('aria-describedby') || '';
    this.renderer.setAttribute(
      this.host.nativeElement,
      'aria-describedby',
      (this.oldDescription + ' ' + id).trim()
    );
    const r = this.host.nativeElement.getBoundingClientRect(),
      t = this.popup.getBoundingClientRect();
    this.renderer.setStyle(
      this.popup,
      'left',
      Math.max(
        8,
        Math.min(innerWidth - t.width - 8, r.right + 12)
      ) + 'px'
    );
    this.renderer.setStyle(
      this.popup,
      'top',
      Math.max(8, Math.min(innerHeight - t.height - 8, r.top + (r.height - t.height) / 2)) + 'px'
    );
    this.listeners = [
      this.renderer.listen(this.popup, 'mouseenter', () =>
        clearTimeout(this.timer)
      ),
      this.renderer.listen(this.popup, 'mouseleave', () => this.hide()),
    ];
    document.addEventListener('scroll', this.scrollHandler, true);
  }
  @HostListener('mouseleave') leave() {
    this.hovered = false;
    this.scheduleHide();
  }
  @HostListener('focusout') scheduleHide() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.hide(), 100);
  }
  @HostListener('click')
  @HostListener('document:keydown.escape')
  @HostListener('window:resize')
  hide() {
    clearTimeout(this.timer);
    document.removeEventListener('scroll', this.scrollHandler, true);
    if (!this.popup) return;
    this.listeners.forEach((fn) => fn());
    this.listeners = [];
    this.renderer.removeChild(document.body, this.popup);
    this.popup = null;
    if (this.oldDescription)
      this.renderer.setAttribute(
        this.host.nativeElement,
        'aria-describedby',
        this.oldDescription
      );
    else
      this.renderer.removeAttribute(
        this.host.nativeElement,
        'aria-describedby'
      );
  }
  ngOnDestroy() {
    this.hide();
  }
}
