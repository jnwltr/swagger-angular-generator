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
}

@Injectable()
  export class DeleteOrderService {
    private baseUrl = 'http://example.com';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }
  /**
   * Delete order
   * http://example.com/swagger-ui.html#!/DeleteOrder/DeleteOrder
   */
  order(params: OrderParams): Observable<object> {
    const pathParams = {
      orderId: params.orderId,
    };
    return this.http.delete<object>(`${this.baseUrl}/api/order/${pathParams.orderId}`);
  }
}
