/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import * as actions from './actions';

export interface LoginState {
  data: object | null;
  loading: boolean;
  error: string | null;
}

export const initialLoginState: LoginState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Login';
export const getLoginStateSelector: MemoizedSelector<object, LoginState> = createFeatureSelector<LoginState>(selectorName);

export function LoginReducer(
  state: LoginState = initialLoginState,
  action: actions.LoginAction): LoginState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
