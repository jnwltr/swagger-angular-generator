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
export interface PositionsParams {
  /**
   * Position Id
   * format: int32
   */
  positionId: number;
  /** API version */
  version: string;
}

@Injectable()
  export class CareerService {
    private baseUrl = 'http://example.com';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }
  /**
   * get career
   * http://example.com/swagger-ui.html#!/Career/Career
   */
  positions(params: PositionsParams): Observable<object> {
    const pathParams = {
      positionId: params.positionId,
      version: params.version,
    };
    return this.http.get<object>(`${this.baseUrl}/api/career/v${pathParams.version}/positions/${pathParams.positionId}`);
  }
}
