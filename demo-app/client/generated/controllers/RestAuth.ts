/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface Rest-auth_user_updateParams {
  data: __model.UserDetails;
}

export interface Rest-auth_user_partial_updateParams {
  data: __model.UserDetails;
}

@Injectable()
export class RestAuthService {
  constructor(private http: HttpClient) {}

  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_logout_list
   */
  rest-auth_logout_list(): Observable<void> {
    return this.http.get<void>(`/api-base-path/rest-auth/logout/`);
  }

  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_logout_create
   */
  rest-auth_logout_create(): Observable<void> {
    return this.http.post<void>(`/api-base-path/rest-auth/logout/`, {});
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_user_read
   */
  rest-auth_user_read(): Observable<__model.UserDetails> {
    return this.http.get<__model.UserDetails>(`/api-base-path/rest-auth/user/`);
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_user_update
   */
  rest-auth_user_update(params: Rest-auth_user_updateParams): Observable<__model.UserDetails> {
    const bodyParams = params.data;

    return this.http.put<__model.UserDetails>(`/api-base-path/rest-auth/user/`, bodyParams || {});
  }
  rest-auth_user_update_(data: __model.UserDetails): Observable<__model.UserDetails> {
    return this.rest-auth_user_update({data});
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_user_partial_update
   */
  rest-auth_user_partial_update(params: Rest-auth_user_partial_updateParams): Observable<__model.UserDetails> {
    const bodyParams = params.data;

    return this.http.patch<__model.UserDetails>(`/api-base-path/rest-auth/user/`, bodyParams || {});
  }
  rest-auth_user_partial_update_(data: __model.UserDetails): Observable<__model.UserDetails> {
    return this.rest-auth_user_partial_update({data});
  }

}
