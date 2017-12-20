/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface OrderParams {
  /**
   * order Id
   * format: uuid
   */
  orderId: string;
  /** producer */
  producer?: string;
  /** model */
  model?: string;
}

@Injectable()
export class PatchOrderService {
  constructor(private http: HttpClient) {}

  /**
   * Patches order
   * http://example.com/swagger/swagger-ui.html#!/PatchOrder/PatchOrder
   */
  order(params: OrderParams): Observable<object> {
    const pathParams = {
      orderId: params.orderId,
    };
    const bodyParams = {
      producer: params.producer,
      model: params.model,
    };
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams).forEach(([key, value]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value});
    return this.http.patch<object>(`/api/order/${pathParams.orderId}`, bodyParamsWithoutUndefined);
  }
}
