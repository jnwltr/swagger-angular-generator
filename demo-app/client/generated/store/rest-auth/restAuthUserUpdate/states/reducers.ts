/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';

import * as actions from './actions';

export interface RestAuthUserUpdateState {
  data: __model.UserDetails;
  loading: boolean;
  error: string;
}

export const initialRestAuthUserUpdateState: RestAuthUserUpdateState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'RestAuthUserUpdate';
export const getRestAuthUserUpdateStateSelector = createFeatureSelector<RestAuthUserUpdateState>(selectorName);

export function RestAuthUserUpdateReducer(
  state: RestAuthUserUpdateState = initialRestAuthUserUpdateState,
  action: actions.RestAuthUserUpdateAction): RestAuthUserUpdateState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
