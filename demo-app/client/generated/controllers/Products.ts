/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as model from '../model';

export interface ProductsParams {
  stringField?: string;
  /** format: int32 */
  int32Field?: number;
  BooleanField?: boolean;
  /** format: int64 */
  longField?: number;
  floatField?: number;
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
  products(params: ProductsParams): Observable<model.Products> {
    const queryParamBase = {
      stringField: params.stringField,
      int32Field: params.int32Field,
      BooleanField: params.BooleanField,
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

    return this.http.get<model.Products>(`/api/products`, {params: queryParams});
  }
}
