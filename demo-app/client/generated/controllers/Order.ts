/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as __model from '../model';

export interface OrderParams {
  /** order */
  orderDto?: __model.OrderDto;
  producer?: string;
}

export interface PatchOrderParams {
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

export interface PutOrderParams {
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

export interface DeleteORDERParams {
  /**
   * order Id
   * format: uuid
   */
  orderId: string;
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
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
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

  /**
   * Patches order
   * http://example.com/swagger/swagger-ui.html#!/Order/PatchOrder
   */
  patchOrder(params: PatchOrderParams): Observable<object> {
    const pathParams = {
      orderId: params.orderId,
    };
    const bodyParams = {
      producer: params.producer,
      model: params.model,
    };
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.patch<object>(`/api/order/${pathParams.orderId}`, bodyParamsWithoutUndefined);
  }

  /**
   * Put for order
   * http://example.com/swagger/swagger-ui.html#!/Order/Put-Order
   */
  putOrder(params: PutOrderParams): Observable<object> {
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
    return this.http.put<object>(`/api/order/${pathParams.orderId}`, bodyParamsWithoutUndefined);
  }

  /**
   * Delete order
   * http://example.com/swagger/swagger-ui.html#!/Order/deleteORDER
   */
  deleteORDER(params: DeleteORDERParams): Observable<object> {
    const pathParams = {
      orderId: params.orderId,
    };
    return this.http.delete<object>(`/api/order/${pathParams.orderId}`);
  }
  deleteORDER_(orderId: string): Observable<object> {
    return this.deleteORDER({orderId});
  }

}
