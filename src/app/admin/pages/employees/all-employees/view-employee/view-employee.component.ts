import { Component,OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortalService } from '../../../../../api-services/portal.service';
@Component({selector:'app-view-employee',templateUrl:'./view-employee.component.html',styleUrls:['./view-employee.component.css']})
export class ViewEmployeeComponent implements OnInit,OnDestroy {
 data:any={};employee:any={};loading=false;error='';tab='Profile';tabs=['Profile','Personal details','Bank details','Onboarding'];subscription:Subscription;request:Subscription;empId='';
 constructor(private route:ActivatedRoute,public api:PortalService){}
 ngOnInit(){this.subscription=this.route.paramMap.subscribe(params=>{this.empId=params.get('empId')||'';this.load();});}
 load(){if(this.request){this.request.unsubscribe();}this.loading=true;this.error='';this.request=this.api.get('/employees/'+encodeURIComponent(this.empId)).subscribe(data=>{this.data=data;this.employee=data.employeeInfo||{};this.loading=false;},e=>{this.loading=false;this.error=this.api.message(e);});}
 get details(){const value=this.tab==='Profile'?this.employee:this.tab==='Personal details'?this.data.empBasicInfo:this.tab==='Bank details'?this.data.empBankInfo:this.data.empOnboardingInfo;return Object.keys(value||{}).filter(k=>!['userId','profile','password','empPassword','adminPassword','settingsPassword','atmCardInfo'].includes(k)).map(key=>({key:key.replace(/([A-Z])/g,' $1'),value:value[key],object:typeof value[key]==='object'&&value[key]!==null}));}
 format(value:any){return value===null||value===undefined||value===''?'Not provided':String(value);}
 ngOnDestroy(){if(this.subscription){this.subscription.unsubscribe();}if(this.request){this.request.unsubscribe();}}
}
