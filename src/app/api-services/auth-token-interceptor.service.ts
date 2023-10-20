import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthTokenInterceptorService implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log('Called toekn intercept() function');

        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');
        let userHeaders: any = [];
        let userSetHeaders: any = {};   

        if (!token || !role) {
            return next.handle(request);
        } else {
			const user = role == 'admin' ? role : 'emp';
            userSetHeaders = {
                userId: sessionStorage.getItem('userId'),
                empId: sessionStorage.getItem('empId'),
                [`${user}LoginName`]: sessionStorage.getItem(`${user}LoginName`),
                // userName: sessionStorage.getItem('userName'),
                email: sessionStorage.getItem('email'),
                role: sessionStorage.getItem('role')
            }
            userHeaders = [`${token}`, userSetHeaders['userId'], role];

            const clientRequest = request.clone({
                // headers: request.headers.set('Authorization', [`Bearer ${token}`, userId, role]),
                headers: request.headers.set('Authorization', userHeaders),
                setHeaders: userSetHeaders
            });
    
            return next.handle(clientRequest);
        }
    }
}
