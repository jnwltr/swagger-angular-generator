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
export interface RegistrationParams {
  /**
   * E-mail
   * format: email
   */
  email: string;
  /** Password 1 */
  password1: string;
  /** Password 2 */
  password2: string;
  /** Registration type */
  registrationType: string;
}

@Injectable()
  export class RegistrationService {
    private baseUrl = 'http://example.com';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }
  /**
   * create registration credentials
   * http://example.com/swagger-ui.html#!/Registration/Registration
   */
  registration(params: RegistrationParams): Observable<object> {
    const formDataParams = {
      email: params.email,
      password1: params.password1,
      password2: params.password2,
    };
    const pathParams = {
      registrationType: params.registrationType,
    };
    return this.http.post<object>(`${this.baseUrl}/api/registration/${pathParams.registrationType}`, formDataParams);
  }
}
