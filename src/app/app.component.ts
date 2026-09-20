import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({selector:'app-root',templateUrl:'./app.component.html',styleUrls:['./app.component.css']})
export class AppComponent implements OnDestroy { title='MiNi HRMS'; authMode=true; homeMode=true; subscription:Subscription; constructor(router:Router){this.subscription=router.events.subscribe(event=>{if(event instanceof NavigationEnd){this.homeMode=event.urlAfterRedirects.split(/[?#]/)[0] === "/";this.authMode=this.homeMode || /\/admin\/(login|signup|forgot-password|reset-password)(?:[/?]|$)/.test(event.urlAfterRedirects);}});}ngOnDestroy(){this.subscription.unsubscribe();} }
