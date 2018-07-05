/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import * as actions from './actions';

export interface RestAuthLogoutListState {
  data: void | null;
  loading: boolean;
  error: string | null;
}

export const initialRestAuthLogoutListState: RestAuthLogoutListState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'RestAuthLogoutList';
export const getRestAuthLogoutListStateSelector: MemoizedSelector<object, RestAuthLogoutListState> = createFeatureSelector<RestAuthLogoutListState>(selectorName);

export function RestAuthLogoutListReducer(
  state: RestAuthLogoutListState = initialRestAuthLogoutListState,
  action: actions.RestAuthLogoutListAction): RestAuthLogoutListState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
