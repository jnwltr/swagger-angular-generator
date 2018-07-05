/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import * as actions from './actions';

export interface RegistrationState {
  data: object | null;
  loading: boolean;
  error: string | null;
}

export const initialRegistrationState: RegistrationState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Registration';
export const getRegistrationStateSelector: MemoizedSelector<object, RegistrationState> = createFeatureSelector<RegistrationState>(selectorName);

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
