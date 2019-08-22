/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface DashedParams {
  /** testing number */
  pathParam: number;
  /** testing number */
  queryParam: number;
  /** testing number */
  queryParamCollectionDefault: string[];
  /** testing number */
  queryParamCollectionCsv: string[];
  /** testing number */
  queryParamCollectionSsv: number[];
  /** testing number */
  queryParamCollectionMulti: number[];
  /** testing number */
  headerParam: number;
  /** testing number */
  bodyParam: number;
  /** testing number */
  'dashed-path-param': number;
  /** testing number */
  'dashed-query-param': number;
  'dashed-query-param-collection-tsv': string[];
  'dashed-query-param-collection-pipes': number[];
  'dashed-query-param-collection-multi': string[];
  /** testing number */
  'dashed-header-param': number;
  /** testing number */
  'dashed-body-param': number;
}

@Injectable()
export class ParamsService {
  constructor(private http: HttpClient) {}

  /**
   * Test of param handling
   * http://example.com/swagger/swagger-ui.html#!/Params/params_test
   */
  dashed(params: DashedParams): Observable<void> {
    const pathParams = {
      pathParam: params.pathParam,
      'dashed-path-param': params['dashed-path-param'],
    };
    const queryParamBase = {
      queryParam: params.queryParam,
      queryParamCollectionDefault: params.queryParamCollectionDefault.join(','),
      queryParamCollectionCsv: params.queryParamCollectionCsv.join(','),
      queryParamCollectionSsv: params.queryParamCollectionSsv.join(' '),
      queryParamCollectionMulti: params.queryParamCollectionMulti,
      'dashed-query-param': params['dashed-query-param'],
      'dashed-query-param-collection-tsv': params['dashed-query-param-collection-tsv'].join('\t'),
      'dashed-query-param-collection-pipes': params['dashed-query-param-collection-pipes'].join('|'),
      'dashed-query-param-collection-multi': params['dashed-query-param-collection-multi'],
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    const headerParams = new HttpHeaders({
      headerParam: params.headerParam.toString(),
      'dashed-header-param': params['dashed-header-param'].toString(),
    });
    const bodyParams = {
      bodyParam: params.bodyParam,
      'dashed-body-param': params['dashed-body-param'],
    };

    return this.http.post<void>(`/api-base-path/params/normal/${pathParams.pathParam}/dashed/${pathParams['dashed-path-param']}`, bodyParams || {}, {params: queryParams, headers: headerParams});
  }
}
