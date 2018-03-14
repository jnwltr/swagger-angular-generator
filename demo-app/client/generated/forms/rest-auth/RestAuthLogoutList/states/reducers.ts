/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface RestAuthLogoutListState {
  data: any;
  loading: boolean;
  error: string;
}

export const initialRestAuthLogoutListState: RestAuthLogoutListState = {
  data: {},
  loading: false,
  error: '',
};

export const getRestAuthLogoutListStateSelector = createFeatureSelector<RestAuthLogoutListState>('RestAuthLogoutList');

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
