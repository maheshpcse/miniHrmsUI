import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthAdminService } from './auth-admin.service';
@Injectable({providedIn:'root'})
export class AuthTokenInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthAdminService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ownApi = request.url.startsWith(environment.apiUrl + '/');
    const token = this.auth.getLoginToken();
    if (ownApi && token) { request = request.clone({setHeaders:{Authorization:'Bearer ' + token}}); }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (ownApi && error.status === 401 && !request.url.includes('/auth/')) { this.auth.isLoggedOut(); }
      return throwError(error);
    }));
  }
}
