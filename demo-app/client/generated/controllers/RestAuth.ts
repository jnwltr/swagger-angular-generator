/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as model from '../model';

export interface RestAuthUserUpdateParams {
  data: model.UserDetails;
}

export interface RestAuthUserPartialUpdateParams {
  data: model.UserDetails;
}

@Injectable()
export class RestAuthService {
  constructor(private http: HttpClient) {}

  /**
   * Calls Django logout method and delete the Token object
  assigned to the current User object.

  Accepts/Returns nothing.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_logout_list
   */
  RestAuthLogoutList(): Observable<void> {
    return this.http.get<void>(`/rest-auth/logout/`);
  }

  /**
   * Calls Django logout method and delete the Token object
  assigned to the current User object.

  Accepts/Returns nothing.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_logout_create
   */
  RestAuthLogoutCreate(): Observable<void> {
    return this.http.post<void>(`/rest-auth/logout/`, {});
  }

  /**
   * Reads and updates UserModel fields
  Accepts GET, PUT, PATCH methods.

  Default accepted fields: username, first_name, last_name
  Default display fields: pk, username, email, first_name, last_name
  Read-only fields: pk, email

  Returns UserModel fields.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_user_read
   */
  RestAuthUserRead(): Observable<model.UserDetails> {
    return this.http.get<model.UserDetails>(`/rest-auth/user/`);
  }

  /**
   * Reads and updates UserModel fields
  Accepts GET, PUT, PATCH methods.

  Default accepted fields: username, first_name, last_name
  Default display fields: pk, username, email, first_name, last_name
  Read-only fields: pk, email

  Returns UserModel fields.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_user_update
   */
  RestAuthUserUpdate(params: RestAuthUserUpdateParams): Observable<model.UserDetails> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.put<model.UserDetails>(`/rest-auth/user/`, bodyParamsWithoutUndefined);
  }

  /**
   * Reads and updates UserModel fields
  Accepts GET, PUT, PATCH methods.

  Default accepted fields: username, first_name, last_name
  Default display fields: pk, username, email, first_name, last_name
  Read-only fields: pk, email

  Returns UserModel fields.
   * http://example.com/swagger/swagger-ui.html#!/rest-auth/rest-auth_user_partial_update
   */
  RestAuthUserPartialUpdate(params: RestAuthUserPartialUpdateParams): Observable<model.UserDetails> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.patch<model.UserDetails>(`/rest-auth/user/`, bodyParamsWithoutUndefined);
  }
}
