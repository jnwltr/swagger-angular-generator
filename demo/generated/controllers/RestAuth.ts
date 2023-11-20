/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface RestAuthUserUpdateParams {
  data: __model.UserDetails;
}

export interface RestAuthUserPartialUpdateParams {
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
  restAuthLogoutList(): Observable<void> {
    return this.http.get<void>(`/api-base-path/rest-auth/logout/`);
  }

  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_logout_create
   */
  restAuthLogoutCreate(): Observable<void> {
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
  restAuthUserRead(): Observable<__model.UserDetails> {
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
  restAuthUserUpdate(params: RestAuthUserUpdateParams): Observable<__model.UserDetails> {
    const bodyParams = params.data;

    return this.http.put<__model.UserDetails>(`/api-base-path/rest-auth/user/`, bodyParams || {});
  }
  restAuthUserUpdate_(data: __model.UserDetails): Observable<__model.UserDetails> {
    return this.restAuthUserUpdate({data});
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
  restAuthUserPartialUpdate(params: RestAuthUserPartialUpdateParams): Observable<__model.UserDetails> {
    const bodyParams = params.data;

    return this.http.patch<__model.UserDetails>(`/api-base-path/rest-auth/user/`, bodyParams || {});
  }
  restAuthUserPartialUpdate_(data: __model.UserDetails): Observable<__model.UserDetails> {
    return this.restAuthUserPartialUpdate({data});
  }

}
