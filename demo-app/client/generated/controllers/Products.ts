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
  constructor(private http: HttpClient) {}

  /**
   * Get all products
   * http://example.com/swagger/swagger-ui.html#!/Products/Products
   */
  products(params: ProductsParams): Observable<__model.Products> {
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

    return this.http.get<__model.Products>(`/api/products`, {params: queryParams});
  }
}
