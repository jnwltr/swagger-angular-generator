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
  registration(params: RegistrationParams): Observable<object> {
    const formDataParams = {
      email: params.email,
      password1: params.password1,
      password2: params.password2,
      selfRefParam: params.selfRefParam,
    };
    const pathParams = {
      registrationType: params.registrationType,
    };
    return this.http.post<object>(`/api-base-path/registration/${pathParams.registrationType}`, formDataParams);
  }

  /**
   * create registration credentials
   * http://example.com/swagger/swagger-ui.html#!/Registration/Registration
   * return httpResponse
   */
  registrationWithResponse(params: RegistrationParams):Observable<HttpResponse<object>> {
    const formDataParams = {
      email: params.email,
      password1: params.password1,
      password2: params.password2,
      selfRefParam: params.selfRefParam,
    };
    const pathParams = {
      registrationType: params.registrationType,
    };
    return this.http.post<object>(`/api-base-path/registration/${pathParams.registrationType}`, formDataParams, {observe: 'response'});
  }
}
