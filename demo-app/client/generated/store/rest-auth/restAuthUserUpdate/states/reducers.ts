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

export interface RestAuthUserUpdateState {
  data: __model.UserDetails | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  res: HttpResponse<__model.UserDetails> | null;
}

export const initialRestAuthUserUpdateState: RestAuthUserUpdateState = {
  data: null,
  loading: false,
  error: null,
  res: null,
};

export const selectorName = 'RestAuth_RestAuthUserUpdate';
export const getRestAuthUserUpdateStateSelector = createFeatureSelector<RestAuthUserUpdateState>(selectorName);

export function RestAuthUserUpdateReducer(
  state: RestAuthUserUpdateState = initialRestAuthUserUpdateState,
  action: actions.RestAuthUserUpdateAction): RestAuthUserUpdateState {
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
