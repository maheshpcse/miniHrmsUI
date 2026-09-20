import { apiErrorMessage } from './api-error';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class PortalService {
  readonly updates = new Subject<void>();
  readonly base = environment.apiUrl + '/portal';
  constructor(private http: HttpClient) {}
  private unwrap(response: any): any {
    if (!response || !response.success) {
      const failure: any = new Error('Request failed');
      failure.userMessage = apiErrorMessage({ error: response });
      throw failure;
    }
    return response.data;
  }
  get(url: string, query: any = {}) {
    let params = new HttpParams();
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined && query[key] !== null) {
        params = params.set(key, String(query[key]));
      }
    });
    return this.http
      .get<any>(this.base + url, { params })
      .pipe(map((r) => this.unwrap(r)));
  }
  post(url: string, body: any) {
    return this.http.post<any>(this.base + url, body).pipe(
      map((r) => this.unwrap(r)),
      tap(() => this.updates.next())
    );
  }
  put(url: string, body: any) {
    return this.http.put<any>(this.base + url, body).pipe(
      map((r) => this.unwrap(r)),
      tap(() => this.updates.next())
    );
  }
  message(error: any) {
    return apiErrorMessage(error);
  }
}
