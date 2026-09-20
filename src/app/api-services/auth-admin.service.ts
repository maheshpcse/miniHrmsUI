import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({providedIn:'root'})
export class AuthAdminService {
  bSubject = new BehaviorSubject<any>(null);
  private keys = ['token','userId','empId','role','firstName','lastName','email','userName','adminLoginId','adminLoginName','auditLoginId','permissions','expired','accessToken','refreshToken','profile','adminPassword','settingsPassword','isSettingsMenuActive'];
  constructor(private http: HttpClient, public router: Router) {}
  get role() { return this.getLoginRole(); }
  adminLogin(data: any) { return this.http.post<any>(environment.apiUrl + '/portal/auth/login',data); }
  adminAndSettingsLogout(data: any = {}) { return this.http.post<any>(environment.apiUrl + '/portal/auth/logout',data); }
  validateAdminEmail(data: any) { return this.http.post<any>(environment.apiUrl + '/portal/auth/forgot',data); }
  updateAdminPassword(data: any) { return this.http.post<any>(environment.apiUrl + '/portal/auth/reset',data); }
  getLoginId() { return sessionStorage.getItem('userId'); }
  getLoginRole() { return sessionStorage.getItem('role'); }
  getLoginToken() { return sessionStorage.getItem('token'); }
  getLoginPayload() { try { const token = this.getLoginToken(); if (!token) { return null; } const part = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'); return JSON.parse(atob(part)); } catch (_) { return null; } }
  isLoggedIn(role?: any): boolean { const payload = this.getLoginPayload(); return !!(payload && Number(payload.exp) * 1000 > Date.now()); }
  allowed(permission: string): boolean { if (this.getLoginRole() === 'admin') { return true; } try { const permissions = JSON.parse(sessionStorage.getItem('permissions') || '[]'); return permissions.indexOf(permission) >= 0; } catch (_) { return false; } }
  setSession(data: any) { this.clearSession(); this.keys.forEach(key => { if (data[key] !== undefined && !['adminPassword','settingsPassword','accessToken','refreshToken'].includes(key)) { sessionStorage.setItem(key, typeof data[key] === 'object' ? JSON.stringify(data[key]) : String(data[key])); } }); this.bSubject.next(data); }
  clearSession() { this.keys.forEach(key => { sessionStorage.removeItem(key); localStorage.removeItem(key); }); this.bSubject.next(null); }
  isLoggedOut(role?: any) { this.clearSession(); this.router.navigate(['/admin/login']); }
}
