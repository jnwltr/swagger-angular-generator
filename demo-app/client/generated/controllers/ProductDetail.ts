/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

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
  productDetail(params: ProductDetailParams): Observable<__model.ProductDetail> {
    const pathParams = {
      productId: params.productId,
    };
    return this.http.get<__model.ProductDetail>(`/api-base-path/product-detail/${pathParams.productId}`);
  }

  /**
   * Get product detail
   * http://example.com/swagger/swagger-ui.html#!/ProductDetail/ProductDetail
   * return httpResponse
   */
  productDetailWithResponse(params: ProductDetailParams): Observable<HttpResponse<__model.ProductDetail>> {
    const pathParams = {
      productId: params.productId,
    };
    return this.http.get<__model.ProductDetail>(`/api-base-path/product-detail/${pathParams.productId}`, {observe: 'response'});
  }
  productDetail_(productId: number): Observable<__model.ProductDetail> {
    return this.productDetail({productId});
  }

}
