/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';

import * as actions from './actions';

export interface RestAuthUserReadState {
  data: __model.UserDetails;
  loading: boolean;
  error: string;
}

export const initialRestAuthUserReadState: RestAuthUserReadState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'RestAuthUserRead';
export const getRestAuthUserReadStateSelector = createFeatureSelector<RestAuthUserReadState>(selectorName);

export function RestAuthUserReadReducer(
  state: RestAuthUserReadState = initialRestAuthUserReadState,
  action: actions.RestAuthUserReadAction): RestAuthUserReadState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
