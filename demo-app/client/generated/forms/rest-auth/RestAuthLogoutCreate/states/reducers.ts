/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface CreateRestAuthRestAuthLogoutCreateState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialCreateRestAuthRestAuthLogoutCreateState: CreateRestAuthRestAuthLogoutCreateState = {
  data: {},
  loading: false,
  error: '',
};

export const getCreateRestAuthRestAuthLogoutCreateStateSelector = createFeatureSelector<CreateRestAuthRestAuthLogoutCreateState>('CreateRestAuthRestAuthLogoutCreate');

export function CreateRestAuthRestAuthLogoutCreateReducer(
  state: CreateRestAuthRestAuthLogoutCreateState = initialCreateRestAuthRestAuthLogoutCreateState,
  action: actions.AllCreateRestAuthRestAuthLogoutCreateActions): CreateRestAuthRestAuthLogoutCreateState {

  switch (action.type) {
  case actions.CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_START:
  return {...state, loading: true, error: null};

  case actions.CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
