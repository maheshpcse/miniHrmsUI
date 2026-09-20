import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({providedIn:'root'})
export class PortalService {
  readonly base = environment.apiUrl + '/portal';
  constructor(private http: HttpClient) {}
  private unwrap(response: any): any { if (!response || !response.success) { throw new Error(response && response.message || 'The request could not be completed.'); } return response.data; }
  get(url: string, query: any = {}) { let params = new HttpParams(); Object.keys(query).forEach(key => { if (query[key] !== undefined && query[key] !== null) { params = params.set(key, String(query[key])); } }); return this.http.get<any>(this.base + url, {params}).pipe(map(r => this.unwrap(r))); }
  post(url: string, body: any) { return this.http.post<any>(this.base + url, body).pipe(map(r => this.unwrap(r))); }
  put(url: string, body: any) { return this.http.put<any>(this.base + url, body).pipe(map(r => this.unwrap(r))); }
  message(error: any) { return error && error.error && error.error.message || error && error.message || 'Unable to connect. Please try again.'; }
}
