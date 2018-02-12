/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface CreateLogoutLogoutState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialCreateLogoutLogoutState: CreateLogoutLogoutState = {
  data: {},
  loading: false,
  error: '',
};

export const getCreateLogoutLogoutStateSelector = createFeatureSelector<CreateLogoutLogoutState>('CreateLogoutLogout');

export function CreateLogoutLogoutReducer(
  state: CreateLogoutLogoutState = initialCreateLogoutLogoutState,
  action: actions.AllCreateLogoutLogoutActions): CreateLogoutLogoutState {

  switch (action.type) {
  case actions.CREATE_LOGOUT_LOGOUT_START:
  return {...state, loading: true, error: null};

  case actions.CREATE_LOGOUT_LOGOUT_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.CREATE_LOGOUT_LOGOUT_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
