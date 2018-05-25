/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import * as __model from '../../../../model';
import * as actions from './actions';

export interface RestAuthUserUpdateState {
  data: __model.UserDetails | null;
  loading: boolean;
  error: string | null;
}

export const initialRestAuthUserUpdateState: RestAuthUserUpdateState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'RestAuthUserUpdate';
export const getRestAuthUserUpdateStateSelector: MemoizedSelector<object, RestAuthUserUpdateState> = createFeatureSelector<RestAuthUserUpdateState>(selectorName);

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
