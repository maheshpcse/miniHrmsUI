import { Component,Input } from '@angular/core';
@Component({selector:'app-dynamic-org-chart',templateUrl:'./dynamic-org-chart.component.html'})
export class DynamicOrgChartComponent { @Input() EmpOrgData:any={}; @Input() EmpProcessData:any[]=[]; }
