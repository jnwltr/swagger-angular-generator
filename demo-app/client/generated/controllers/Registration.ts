/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface RegistrationParams {
  /** Registration type */
  registrationType: string;
  /**
   * E-mail
   * format: email
   */
  email: string;
  /** Password 1 */
  password1: string;
  /** Password 2 */
  password2: string;
}

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {}

  /**
   * create registration credentials
   * http://example.com/swagger/swagger-ui.html#!/Registration/Registration
   */
  registration(params: RegistrationParams): Observable<object> {
    const pathParams = {
      registrationType: params.registrationType,
    };
    const formDataParams = {
      email: params.email,
      password1: params.password1,
      password2: params.password2,
    };
    return this.http.post<object>(`/api/registration/${pathParams.registrationType}`, formDataParams);
  }
}
