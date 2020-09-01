/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as __model from '../../../../model';
import * as actions from './actions';

export interface Rest-auth_user_updateState {
  data: __model.UserDetails | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialRest-auth_user_updateState: Rest-auth_user_updateState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'RestAuth_Rest-auth_user_update';
export const getRest-auth_user_updateStateSelector = createFeatureSelector<Rest-auth_user_updateState>(selectorName);

export function Rest-auth_user_updateReducer(
  state: Rest-auth_user_updateState = initialRest-auth_user_updateState,
  action: actions.Rest-auth_user_updateAction): Rest-auth_user_updateState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
