/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import * as actions from './actions';

export interface CreateRegistrationRegistrationState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialCreateRegistrationRegistrationState: CreateRegistrationRegistrationState = {
  data: {},
  loading: false,
  error: '',
};

export function CreateRegistrationRegistrationReducer(
  state: CreateRegistrationRegistrationState = initialCreateRegistrationRegistrationState,
  action: actions.AllCreateRegistrationRegistrationActions): CreateRegistrationRegistrationState {

  switch (action.type) {
  case actions.CREATE_REGISTRATION_REGISTRATION_START:
  return {...state, loading: true, error: null};

  case actions.CREATE_REGISTRATION_REGISTRATION_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.CREATE_REGISTRATION_REGISTRATION_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
