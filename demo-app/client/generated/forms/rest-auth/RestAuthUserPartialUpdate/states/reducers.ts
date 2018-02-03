/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface UpdateRestAuthRestAuthUserPartialUpdateState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialUpdateRestAuthRestAuthUserPartialUpdateState: UpdateRestAuthRestAuthUserPartialUpdateState = {
  data: {},
  loading: false,
  error: '',
};

export const getUpdateRestAuthRestAuthUserPartialUpdateStateSelector = createFeatureSelector<UpdateRestAuthRestAuthUserPartialUpdateState>('UpdateRestAuthRestAuthUserPartialUpdate');

export function UpdateRestAuthRestAuthUserPartialUpdateReducer(
  state: UpdateRestAuthRestAuthUserPartialUpdateState = initialUpdateRestAuthRestAuthUserPartialUpdateState,
  action: actions.AllUpdateRestAuthRestAuthUserPartialUpdateActions): UpdateRestAuthRestAuthUserPartialUpdateState {

  switch (action.type) {
  case actions.UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_START:
  return {...state, loading: true, error: null};

  case actions.UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
