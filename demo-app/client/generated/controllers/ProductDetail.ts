/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

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
  constructor(private http: HttpClient) {}

  /**
   * Get product detail
   * http://example.com/swagger/swagger-ui.html#!/ProductDetail/ProductDetail
   */
  productDetail(params: ProductDetailParams): Observable<model.ProductDetail> {
    const pathParams = {
      productId: params.productId,
    };
    return this.http.get<model.ProductDetail>(`/api/product-detail/${pathParams.productId}`);
  }
}
