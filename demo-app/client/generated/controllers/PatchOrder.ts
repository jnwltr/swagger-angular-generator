/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {HttpClient, HttpParams} from '@angular/common/http';
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
    const bodyParams = params.producer;
    return this.http.patch<object>(`/api/order/${pathParams.orderId}`, bodyParams);
  }
}
