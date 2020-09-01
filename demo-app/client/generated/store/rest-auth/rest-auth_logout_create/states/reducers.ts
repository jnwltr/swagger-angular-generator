/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface Rest-auth_logout_createState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialRest-auth_logout_createState: Rest-auth_logout_createState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'RestAuth_Rest-auth_logout_create';
export const getRest-auth_logout_createStateSelector = createFeatureSelector<Rest-auth_logout_createState>(selectorName);

export function Rest-auth_logout_createReducer(
  state: Rest-auth_logout_createState = initialRest-auth_logout_createState,
  action: actions.Rest-auth_logout_createAction): Rest-auth_logout_createState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
