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
import * as model from '../model';

export interface ProductDetailParams {
  /**
   * product id
   * format: int32
   */
  productId: number;
}

@Injectable()
  export class ProductDetailService {
    private baseUrl = 'http://example.com';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }
  /**
   * Get product detail
   * http://example.com/swagger-ui.html#!/ProductDetail/ProductDetail
   */
  productDetail(params: ProductDetailParams): Observable<model.ProductDetail> {
    const pathParams = {
      productId: params.productId,
    };
    return this.http.get<model.ProductDetail>(`${this.baseUrl}/api/product-detail/${pathParams.productId}`);
  }
}
