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
import * as model from '../model';

export interface LoginParams {
  /** login */
  loginDto: model.LoginDto;
}

@Injectable()
  export class LoginService {
    private baseUrl = 'http://example.com';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }
  /**
   * create registration credentials
   * http://example.com/swagger-ui.html#!/Login/Registration
   */
  login(params: LoginParams): Observable<object> {
    const formDataParams = {
      loginDto: params.loginDto,
    };
    return this.http.post<object>(`${this.baseUrl}/api/login`, formDataParams);
  }
}
