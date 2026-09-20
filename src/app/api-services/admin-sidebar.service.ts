import { Injectable } from '@angular/core';
@Injectable({providedIn:'root'})
export class AdminSidebarService { toggled=false; toggle(){this.toggled=!this.toggled;} getSidebarState(){return this.toggled;} setSidebarState(value:boolean){this.toggled=value;} }
