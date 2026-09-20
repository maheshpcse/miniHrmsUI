import { Component,Input } from '@angular/core';
@Component({selector:'app-user-hierarchy',templateUrl:'./user-hierarchy.component.html'})
export class UserHierarchyComponent { @Input() EmpOrgData:any={}; @Input() EmpProcessData:any[]=[]; }
