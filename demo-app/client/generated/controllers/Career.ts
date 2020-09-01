/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface CareerParams {
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
  Career(params: CareerParams): Observable<object> {
    const pathParams = {
      positionId: params.positionId,
      version: params.version,
    };
    return this.http.get<object>(`/api-base-path/career/v${pathParams.version}/positions/${pathParams.positionId}`);
  }
}
