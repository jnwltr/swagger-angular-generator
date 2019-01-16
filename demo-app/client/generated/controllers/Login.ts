/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface LoginParams {
  /** login */
  loginDto: __model.LoginDto;
}

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  /**
   * create registration credentials
   * http://example.com/swagger/swagger-ui.html#!/Login/Registration
   */
  login(params: LoginParams): Observable<object> {
    const formDataParams = {
      loginDto: params.loginDto,
    };
    return this.http.post<object>(`/api-base-path/login`, formDataParams);
  }

  /**
   * create registration credentials
   * http://example.com/swagger/swagger-ui.html#!/Login/Registration
   * return httpResponse
   */
  loginWithResponse(params: LoginParams): Observable<HttpResponse<object>> {
    const formDataParams = {
      loginDto: params.loginDto,
    };
    return this.http.post<object>(`/api-base-path/login`, formDataParams, {observe: 'response'});
  }
  login_(loginDto: __model.LoginDto): Observable<object> {
    return this.login({loginDto});
  }

}
