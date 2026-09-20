import { Component, Input } from "@angular/core";
@Component({
  selector: "ui-icon",
  template:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="paths[name] || paths.grid"></path></svg>',
  styles: [
    ":host{display:inline-flex;width:21px;height:21px;flex-shrink:0}svg{width:100%;height:100%}",
  ],
})
export class IconComponent {
  @Input() name = "grid";
  paths: { [key: string]: string } = {
    grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    people:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8 M17 4a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87",
    arrow: "M5 12h14 M13 6l6 6-6 6",
    plus: "M12 5v14 M5 12h14",
    search: "M21 21l-5-5 M10.5 3a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4",
    book: "M12 5v16 M12 5C8 2 4 3 2 4v15c3-1 7-1 10 2c3-3 7-3 10-2V4c-3-1-6-2-10 1",
    clock: "M12 8v5l3 2 M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20",
    settings:
      "M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8 M9 3l-1 3-3 1-2 4 2 3 1 4 4 3 4-1 3-3 3-3-1-5-3-3-3-1z",
    request: "M6 3h12v18H6z M9 7h6 M9 11h6 M9 15h3",
    chart: "M3 3v18h18 M7 16v-4 M12 16V7 M17 16v-7",
    code: "M8 5l-6 7 6 7 M16 5l6 7-6 7 M14 3l-4 18",
    database:
      "M3 6c0-5 18-5 18 0s-18 5-18 0v12c0 5 18 5 18 0V6 M3 12c0 5 18 5 18 0",
    workflow: "M9 2h6v6H9z M2 16h6v6H2z M16 16h6v6h-6z M12 8v4H5v4 M12 12h7v4",
    shield: "M12 2l9 4v6c0 6-9 10-9 10S3 18 3 12V6z M8 12l3 3 5-6",
    calendar: "M3 5h18v16H3z M7 2v6 M17 2v6 M3 10h18 M7 14h3 M14 14h3",
    logout: "M9 3H3v18h6 M10 12h11 M17 8l4 4-4 4",
    close: "M6 6l12 12 M18 6L6 18",
    menu: "M3 6h18 M3 12h18 M3 18h18",
    check: "M5 12l4 4L19 6",
    chevron: "M9 5l7 7-7 7",
    sun: "M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12 M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6",
    edit: "M15 4l5 5 M3 21l5-1L21 7l-5-5L3 15z",
    mail: "M2 5h20v14H2z M2 5l10 8L22 5",
    heart: "M12 21S1 14 2 7c1-6 8-5 10-1 2-4 9-5 10 1 1 7-10 14-10 14",
  };
}
