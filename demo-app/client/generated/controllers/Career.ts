/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

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
  constructor(private http: HttpClient) {}

  /**
   * get career
   * http://example.com/swagger/swagger-ui.html#!/Career/Career
   */
  positions(params: PositionsParams): Observable<object> {
    const pathParams = {
      positionId: params.positionId,
      version: params.version,
    };
    return this.http.get<object>(`/api-base-path/career/v${pathParams.version}/positions/${pathParams.positionId}`);
  }

  /**
   * get career
   * http://example.com/swagger/swagger-ui.html#!/Career/Career
   * return httpResponse
   */
  positionsWithResponse(params: PositionsParams):Observable<HttpResponse<object>> {
    const pathParams = {
      positionId: params.positionId,
      version: params.version,
    };
    return this.http.get<object>(`/api-base-path/career/v${pathParams.version}/positions/${pathParams.positionId}`, {observe: 'response'});
  }
}
