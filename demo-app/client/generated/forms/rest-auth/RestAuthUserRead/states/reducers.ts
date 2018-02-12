/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface LoadRestAuthRestAuthUserReadState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialLoadRestAuthRestAuthUserReadState: LoadRestAuthRestAuthUserReadState = {
  data: {},
  loading: false,
  error: '',
};

export const getLoadRestAuthRestAuthUserReadStateSelector = createFeatureSelector<LoadRestAuthRestAuthUserReadState>('LoadRestAuthRestAuthUserRead');

export function LoadRestAuthRestAuthUserReadReducer(
  state: LoadRestAuthRestAuthUserReadState = initialLoadRestAuthRestAuthUserReadState,
  action: actions.AllLoadRestAuthRestAuthUserReadActions): LoadRestAuthRestAuthUserReadState {

  switch (action.type) {
  case actions.LOAD_RESTAUTH_RESTAUTHUSERREAD_START:
  return {...state, loading: true, error: null};

  case actions.LOAD_RESTAUTH_RESTAUTHUSERREAD_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.LOAD_RESTAUTH_RESTAUTHUSERREAD_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
