import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthAdminService } from './auth-admin.service';
@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthAdminService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.auth.isLoggedIn() || this.router.createUrlTree(['/admin/login'], {queryParams:{returnUrl:state.url}}); }
}
