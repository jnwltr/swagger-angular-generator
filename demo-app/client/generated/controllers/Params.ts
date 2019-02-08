/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface DashedParams {
  /** testing number */
  pathParam: number;
  /** testing number */
  queryParam: number;
  /** testing number */
  headerParam: number;
  /** testing number */
  bodyParam: number;
  /** testing number */
  'dashed-path-param': number;
  /** testing number */
  'dashed-query-param': number;
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
      'dashed-query-param': params['dashed-query-param'],
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
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
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<void>(`/api-base-path/params/normal/${pathParams.pathParam}/dashed/${pathParams['dashed-path-param']}`, bodyParamsWithoutUndefined, {params: queryParams, headers: headerParams});
  }

  /**
   * Test of param handling
   * http://example.com/swagger/swagger-ui.html#!/Params/params_test
   * return httpResponse
   */
  dashedWithResponse(params: DashedParams):Observable<HttpResponse<void>> {
    const pathParams = {
      pathParam: params.pathParam,
      'dashed-path-param': params['dashed-path-param'],
    };
    const queryParamBase = {
      queryParam: params.queryParam,
      'dashed-query-param': params['dashed-query-param'],
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
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
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<void>(`/api-base-path/params/normal/${pathParams.pathParam}/dashed/${pathParams['dashed-path-param']}`, bodyParamsWithoutUndefined, {params: queryParams, headers: headerParams, observe: 'response'});
  }
}
