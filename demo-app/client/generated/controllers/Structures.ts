/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpParams} from '@angular/common/http';
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
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    const bodyParams = params.arraySection;

    return this.http.post<__model.ArrayGeneratedInlineModel>(`/api-base-path/structures/array`, bodyParams || {}, {params: queryParams});
  }

  /**
   * structural test for maps
   * http://example.com/swagger/swagger-ui.html#!/Structures/structures_map
   */
  map(params: MapParams): Observable<void> {
    const bodyParams = params.mapSection;

    return this.http.post<void>(`/api-base-path/structures/map`, bodyParams || {});
  }
  map_(mapSection: __model.MapStructure): Observable<void> {
    return this.map({mapSection});
  }

}
