/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

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

    const queryParamBase = {
      producer: params.producer,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.post<object>(`/api-base-path/order`, bodyParams || {}, {params: queryParams});
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

    return this.http.patch<object>(`/api-base-path/order/${pathParams.orderId}`, bodyParams || {});
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

    return this.http.put<object>(`/api-base-path/order/${pathParams.orderId}`, bodyParams || {});
  }

  /**
   * Delete order
   * http://example.com/swagger/swagger-ui.html#!/Order/deleteORDER
   */
  deleteORDER(params: DeleteORDERParams): Observable<object> {
    const pathParams = {
      orderId: params.orderId,
    };
    return this.http.delete<object>(`/api-base-path/order/${pathParams.orderId}`);
  }
  deleteORDER_(orderId: string): Observable<object> {
    return this.deleteORDER({orderId});
  }

}
