/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';

import * as actions from './actions';

export interface RestAuthUserPartialUpdateState {
  data: __model.UserDetails;
  loading: boolean;
  error: string;
}

export const initialRestAuthUserPartialUpdateState: RestAuthUserPartialUpdateState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'RestAuthUserPartialUpdate';
export const getRestAuthUserPartialUpdateStateSelector = createFeatureSelector<RestAuthUserPartialUpdateState>(selectorName);

export function RestAuthUserPartialUpdateReducer(
  state: RestAuthUserPartialUpdateState = initialRestAuthUserPartialUpdateState,
  action: actions.RestAuthUserPartialUpdateAction): RestAuthUserPartialUpdateState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
