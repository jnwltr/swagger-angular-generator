/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import * as actions from './actions';

export interface RegistrationState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialRegistrationState: RegistrationState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Registration';
export const getRegistrationStateSelector = createFeatureSelector<RegistrationState>(selectorName);

export function RegistrationReducer(
  state: RegistrationState = initialRegistrationState,
  action: actions.RegistrationAction): RegistrationState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
