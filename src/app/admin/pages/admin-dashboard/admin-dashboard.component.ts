import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortalService } from '../../../api-services/portal.service';
import { AuthAdminService } from '../../../api-services/auth-admin.service';
@Component({selector:'app-admin-dashboard',templateUrl:'./admin-dashboard.component.html',styleUrls:['./admin-dashboard.component.css']})
export class AdminDashboardComponent implements OnInit,OnDestroy {
 loading=true;error='';data:any={};name=sessionStorage.getItem('firstName')||'there';request:Subscription;
 constructor(public api:PortalService,public auth:AuthAdminService){}
 ngOnInit(){this.load();}
 load(){this.loading=true;this.error='';this.request=this.api.get('/dashboard').subscribe(data=>{this.data=data;this.loading=false;},e=>{this.loading=false;this.error=this.api.message(e);});}
 get stats(){return [{label:'Total people',value:this.data.people,icon:'people',note:'Across your workspace'},{label:'Active employees',value:this.data.active,icon:'heart',note:'Ready to do great things'},{label:'Pending requests',value:this.data.requests,icon:'request',note:'Waiting for a decision'},{label:'Inactive employees',value:this.data.inactive,icon:'people',note:'Inactive employee records'}];}
 initials(row:any){return ((row.firstName||'?').charAt(0)+(row.lastName||'').charAt(0)).toUpperCase();}
 ngOnDestroy(){if(this.request){this.request.unsubscribe();}}
}
