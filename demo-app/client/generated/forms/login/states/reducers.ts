/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import * as actions from './actions';

export interface CreateLoginLoginState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialCreateLoginLoginState: CreateLoginLoginState = {
  data: {},
  loading: false,
  error: '',
};

export function CreateLoginLoginReducer(
  state: CreateLoginLoginState = initialCreateLoginLoginState,
  action: actions.AllCreateLoginLoginActions): CreateLoginLoginState {

  switch (action.type) {
  case actions.CREATE_LOGIN_LOGIN_START:
  return {...state, loading: true, error: null};

  case actions.CREATE_LOGIN_LOGIN_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.CREATE_LOGIN_LOGIN_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
