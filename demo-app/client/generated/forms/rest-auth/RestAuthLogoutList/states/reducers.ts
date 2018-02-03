/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface LoadRestAuthRestAuthLogoutListState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialLoadRestAuthRestAuthLogoutListState: LoadRestAuthRestAuthLogoutListState = {
  data: {},
  loading: false,
  error: '',
};

export const getLoadRestAuthRestAuthLogoutListStateSelector = createFeatureSelector<LoadRestAuthRestAuthLogoutListState>('LoadRestAuthRestAuthLogoutList');

export function LoadRestAuthRestAuthLogoutListReducer(
  state: LoadRestAuthRestAuthLogoutListState = initialLoadRestAuthRestAuthLogoutListState,
  action: actions.AllLoadRestAuthRestAuthLogoutListActions): LoadRestAuthRestAuthLogoutListState {

  switch (action.type) {
  case actions.LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_START:
  return {...state, loading: true, error: null};

  case actions.LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
