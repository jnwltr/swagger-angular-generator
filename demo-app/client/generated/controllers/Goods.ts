/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface GetGoodsListParams {
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
}

@Injectable()
export class GoodsService {
  constructor(private http: HttpClient) {}

  /** http://example.com/swagger/swagger-ui.html#!/goods/goods_get-goods-list_list */
  getGoodsList(params: GetGoodsListParams): Observable<__model.GetGoodsListGeneratedInlineModel> {
    const queryParamBase = {
      limit: params.limit,
      offset: params.offset,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<__model.GetGoodsListGeneratedInlineModel>(`/api-base-path/goods/get-goods-list/`, {params: queryParams});
  }

  /**
   * http://example.com/swagger/swagger-ui.html#!/goods/goods_get-goods-list_list
   * return httpResponse
   */
  getGoodsListWithResponse(params: GetGoodsListParams):Observable<HttpResponse<__model.GetGoodsListGeneratedInlineModel>> {
    const queryParamBase = {
      limit: params.limit,
      offset: params.offset,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<__model.GetGoodsListGeneratedInlineModel>(`/api-base-path/goods/get-goods-list/`, {params: queryParams, observe: 'response'});
  }
}
