/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Inject, Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BASE_URL} from '../model';
import * as model from '../model';

export interface ProductsParams {
  stringField?: string;
  BooleanField?: boolean;
  /** format: int32 */
  int32Field?: number;
  /** format: int64 */
  longField?: number;
  /** format: float */
  floatField?: number;
  /** format: double */
  doubleField?: number;
  /** format: byte */
  byteField?: string;
  /** format: binary */
  binaryField?: string;
  /** format: date */
  dateField?: string;
  /** format: date-time */
  dateTimeField?: string;
}

@Injectable()
  export class ProductsService {
    private baseUrl = 'http://example.com';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }
  /**
   * Get all products
   * http://example.com/swagger-ui.html#!/Products/Products
   */
  products(params: ProductsParams): Observable<model.Products> {
    const queryParamBase = {
      stringField: params.stringField,
      BooleanField: params.BooleanField,
      int32Field: params.int32Field,
      longField: params.longField,
      floatField: params.floatField,
      doubleField: params.doubleField,
      byteField: params.byteField,
      binaryField: params.binaryField,
      dateField: params.dateField,
      dateTimeField: params.dateTimeField,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<model.Products>(`${this.baseUrl}/api/products`, {params: queryParams});
  }
}
