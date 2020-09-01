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
  /** Self ref parameter */
  selfRefParam: __model.SelfRefObject;
  /** Registration type */
  registrationType: string;
}

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {}

  /**
   * create registration credentials
   * http://example.com/swagger/swagger-ui.html#!/Registration/Registration
   */
  Registration(params: RegistrationParams): Observable<object> {
    const formDataParams = new FormData();
    formDataParams.append('email', params.email);
    formDataParams.append('password1', params.password1);
    formDataParams.append('password2', params.password2);
    formDataParams.append('selfRefParam', params.selfRefParam);

    const pathParams = {
      registrationType: params.registrationType,
    };
    return this.http.post<object>(`/api-base-path/registration/${pathParams.registrationType}`, formDataParams);
  }
}
