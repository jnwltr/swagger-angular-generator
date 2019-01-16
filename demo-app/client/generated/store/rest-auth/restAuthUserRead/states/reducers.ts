/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as __model from '../../../../model';
import * as actions from './actions';

export interface RestAuthUserReadState {
  data: __model.UserDetails | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  res: HttpResponse<__model.UserDetails> | null;
}

export const initialRestAuthUserReadState: RestAuthUserReadState = {
  data: null,
  loading: false,
  error: null,
  res: null,
};

export const selectorName = 'RestAuth_RestAuthUserRead';
export const getRestAuthUserReadStateSelector = createFeatureSelector<RestAuthUserReadState>(selectorName);

export function RestAuthUserReadReducer(
  state: RestAuthUserReadState = initialRestAuthUserReadState,
  action: actions.RestAuthUserReadAction): RestAuthUserReadState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {
      ...state,
      data: action.payload.body,
      res: action.payload,
      loading: false,
    };
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
