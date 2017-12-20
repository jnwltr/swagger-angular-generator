/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as model from '../model';

export interface OrderParams {
  /** order */
  orderDto: model.OrderDto;
  producer?: string;
}

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  /**
   * create order
   * http://example.com/swagger/swagger-ui.html#!/Order/Order
   */
  order(params: OrderParams): Observable<object> {
    const bodyParams = params.orderDto;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams).forEach(
      ([key, value]) => { if (value !== undefined) bodyParamsWithoutUndefined[key] = value; },
    );
    const queryParamBase = {
      producer: params.producer,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.post<object>(`/api/order`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
