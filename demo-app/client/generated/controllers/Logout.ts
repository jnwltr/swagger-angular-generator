/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class LogoutService {
  constructor(private http: HttpClient) {}

  /**
   * Logout - empty post body
   * http://example.com/swagger/swagger-ui.html#!/Logout/Logout
   */
  logout(): Observable<object> {
    return this.http.post<object>(`/api-base-path/logout`, {});
  }

  /**
   * Logout - empty post body
   * http://example.com/swagger/swagger-ui.html#!/Logout/Logout
   * return httpResponse
   */
  logoutWithResponse():Observable<HttpResponse<object>> {
    return this.http.post<object>(`/api-base-path/logout`, {}, {observe: 'response'});
  }
}
