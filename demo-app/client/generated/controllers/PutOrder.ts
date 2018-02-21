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
    private baseUrl = 'http://example.com';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }
  /**
   * Put for order
   * http://example.com/swagger-ui.html#!/PutOrder/PutOrder
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
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.put<object>(`${this.baseUrl}/api/order/${pathParams.orderId}`, bodyParamsWithoutUndefined);
  }
}
