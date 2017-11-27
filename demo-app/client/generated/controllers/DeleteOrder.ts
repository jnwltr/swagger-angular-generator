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
}

@Injectable()
export class DeleteOrderService {
  constructor(private http: HttpClient) {}

  /**
   * Delete order
   * http://example.com/swagger/swagger-ui.html#!/DeleteOrder/DeleteOrder
   */
  order(params: OrderParams): Observable<object> {
    const pathParams = {
      orderId: params.orderId,
    };
    return this.http.delete<object>(`/api/order/${pathParams.orderId}`);
  }
}
