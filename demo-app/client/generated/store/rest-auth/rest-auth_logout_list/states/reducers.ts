/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface Rest-auth_logout_listState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialRest-auth_logout_listState: Rest-auth_logout_listState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'RestAuth_Rest-auth_logout_list';
export const getRest-auth_logout_listStateSelector = createFeatureSelector<Rest-auth_logout_listState>(selectorName);

export function Rest-auth_logout_listReducer(
  state: Rest-auth_logout_listState = initialRest-auth_logout_listState,
  action: actions.Rest-auth_logout_listAction): Rest-auth_logout_listState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
