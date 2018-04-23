/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

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
    return this.http.post<object>(`/api/login`, formDataParams);
  }
  login_(loginDto: __model.LoginDto): Observable<object> {
    return this.login({loginDto});
  }

}
