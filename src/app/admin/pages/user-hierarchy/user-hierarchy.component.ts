import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-user-hierarchy',
	templateUrl: './user-hierarchy.component.html',
	styleUrls: ['./user-hierarchy.component.css']
})
export class UserHierarchyComponent implements OnInit {

	@Input() EmpOrgData: any = [];

	constructor() { }

	ngOnInit(): void {
		console.log('Get employee organization data isss:', this.EmpOrgData);
	}

}
