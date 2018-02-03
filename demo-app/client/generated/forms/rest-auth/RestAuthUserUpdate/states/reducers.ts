/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface UpdateRestAuthRestAuthUserUpdateState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialUpdateRestAuthRestAuthUserUpdateState: UpdateRestAuthRestAuthUserUpdateState = {
  data: {},
  loading: false,
  error: '',
};

export const getUpdateRestAuthRestAuthUserUpdateStateSelector = createFeatureSelector<UpdateRestAuthRestAuthUserUpdateState>('UpdateRestAuthRestAuthUserUpdate');

export function UpdateRestAuthRestAuthUserUpdateReducer(
  state: UpdateRestAuthRestAuthUserUpdateState = initialUpdateRestAuthRestAuthUserUpdateState,
  action: actions.AllUpdateRestAuthRestAuthUserUpdateActions): UpdateRestAuthRestAuthUserUpdateState {

  switch (action.type) {
  case actions.UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_START:
  return {...state, loading: true, error: null};

  case actions.UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
