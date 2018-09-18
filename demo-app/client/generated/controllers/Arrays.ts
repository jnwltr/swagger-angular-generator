/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as __model from '../model';

export interface TestStructuresParams {
  /** testing number */
  id: number;
  /** array structures */
  arraySection: __model.ArrayStructures;
}

@Injectable()
export class ArraysService {
  constructor(private http: HttpClient) {}

  /**
   * structural test for arrays and arrays of arrays
   * http://example.com/swagger/swagger-ui.html#!/Arrays/arrays_test-structures
   */
  testStructures(params: TestStructuresParams): Observable<__model.TestStructuresGeneratedInlineModel> {
    const queryParamBase = {
      id: params.id,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    const bodyParams = params.arraySection;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<__model.TestStructuresGeneratedInlineModel>(`/api-base-path/arrays/test-structures`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
