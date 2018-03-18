/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com
 */

import {HttpClient} from '@angular/common/http';
import {Inject, Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BASE_URL} from '../model';
@Injectable()
  export class LogoutService {
    private baseUrl = 'http://example.com';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }
  /**
   * Logout - empty post body
   * http://example.com/swagger-ui.html#!/Logout/Logout
   */
  logout(): Observable<object> {
    return this.http.post<object>(`${this.baseUrl}/api/logout`, {});
  }
}
