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

export interface Structures_arrayParams {
  /** testing number */
  id: number;
  /** array structures */
  arraySection: __model.ArrayStructure;
}

export interface Structures_mapParams {
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
  structures_array(params: Structures_arrayParams): Observable<__model.Structures_arrayGeneratedInlineModel> {
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

    return this.http.post<__model.Structures_arrayGeneratedInlineModel>(`/api-base-path/structures/array`, bodyParams || {}, {params: queryParams});
  }

  /**
   * structural test for maps
   * http://example.com/swagger/swagger-ui.html#!/Structures/structures_map
   */
  structures_map(params: Structures_mapParams): Observable<void> {
    const bodyParams = params.mapSection;

    return this.http.post<void>(`/api-base-path/structures/map`, bodyParams || {});
  }
  structures_map_(mapSection: __model.MapStructure): Observable<void> {
    return this.structures_map({mapSection});
  }

}
