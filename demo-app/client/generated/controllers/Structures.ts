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

export interface ArrayParams {
  /** testing number */
  id: number;
  /** array structures */
  arraySection: __model.ArrayStructure;
}

export interface MapParams {
  /** map structures */
  mapSection: __model.MapStructure;
}

@Injectable()
export class StructuresService {
  constructor(private http: HttpClient) {}

  /**
   * structural test for arrays and arrays of arrays
   * http://example.com/swagger/swagger-ui.html#!/Structures/structures_array
   */
  array(params: ArrayParams): Observable<__model.ArrayGeneratedInlineModel> {
    const queryParamBase = {
      id: params.id,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    const bodyParams = params.arraySection;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<__model.ArrayGeneratedInlineModel>(`/api-base-path/structures/array`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /**
   * structural test for arrays and arrays of arrays
   * http://example.com/swagger/swagger-ui.html#!/Structures/structures_array
   * return httpResponse
   */
  arrayWithResponse(params: ArrayParams):Observable<HttpResponse<__model.ArrayGeneratedInlineModel>> {
    const queryParamBase = {
      id: params.id,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    const bodyParams = params.arraySection;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<__model.ArrayGeneratedInlineModel>(`/api-base-path/structures/array`, bodyParamsWithoutUndefined, {params: queryParams, observe: 'response'});
  }

  /**
   * structural test for maps
   * http://example.com/swagger/swagger-ui.html#!/Structures/structures_map
   */
  map(params: MapParams): Observable<void> {
    const bodyParams = params.mapSection;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<void>(`/api-base-path/structures/map`, bodyParamsWithoutUndefined);
  }

  /**
   * structural test for maps
   * http://example.com/swagger/swagger-ui.html#!/Structures/structures_map
   * return httpResponse
   */
  mapWithResponse(params: MapParams):Observable<HttpResponse<void>> {
    const bodyParams = params.mapSection;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<void>(`/api-base-path/structures/map`, bodyParamsWithoutUndefined, {observe: 'response'});
  }
  map_(mapSection: __model.MapStructure): Observable<void> {
    return this.map({mapSection});
  }

}
