/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as model from '../model';

export interface LoginParams {
  /** login */
  loginDto: model.LoginDto;
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
    return this.http.post<object>(`/api/login`, formDataParams);
  }
}
