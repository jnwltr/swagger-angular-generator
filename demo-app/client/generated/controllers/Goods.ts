/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface Goods_get-goods-list_listParams {
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
}

@Injectable()
export class GoodsService {
  constructor(private http: HttpClient) {}

  /** http://example.com/swagger/swagger-ui.html#!/goods/goods_get-goods-list_list */
  goods_get-goods-list_list(params: Goods_get-goods-list_listParams): Observable<__model.Goods_get-goods-list_listGeneratedInlineModel> {
    const queryParamBase = {
      limit: params.limit,
      offset: params.offset,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<__model.Goods_get-goods-list_listGeneratedInlineModel>(`/api-base-path/goods/get-goods-list/`, {params: queryParams});
  }
}
