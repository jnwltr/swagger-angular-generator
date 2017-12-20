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
  /** car producer */
  producer: string;
  /** car model */
  model: string;
  /** customer name */
  customerName: string;
}

@Injectable()
export class PutOrderService {
  constructor(private http: HttpClient) {}

  /**
   * Put for order
   * http://example.com/swagger/swagger-ui.html#!/PutOrder/PutOrder
   */
  order(params: OrderParams): Observable<object> {
    const pathParams = {
      orderId: params.orderId,
    };
    const bodyParams = {
      producer: params.producer,
      model: params.model,
      customerName: params.customerName,
    };
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams).forEach(([key, value]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value});
    return this.http.put<object>(`/api/order/${pathParams.orderId}`, bodyParamsWithoutUndefined);
  }
}
