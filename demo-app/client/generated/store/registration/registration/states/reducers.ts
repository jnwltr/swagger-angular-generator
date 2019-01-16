/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as actions from './actions';

export interface RegistrationState {
  data: object | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  res: HttpResponse<object> | null;
}

export const initialRegistrationState: RegistrationState = {
  data: null,
  loading: false,
  error: null,
  res: null,
};

export const selectorName = 'Registration_Registration';
export const getRegistrationStateSelector = createFeatureSelector<RegistrationState>(selectorName);

export function RegistrationReducer(
  state: RegistrationState = initialRegistrationState,
  action: actions.RegistrationAction): RegistrationState {
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
