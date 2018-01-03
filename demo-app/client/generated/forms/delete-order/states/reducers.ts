/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import * as actions from './actions';

export interface LoadDeleteOrderOrderState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialLoadDeleteOrderOrderState: LoadDeleteOrderOrderState = {
  data: {},
  loading: false,
  error: '',
};

export function LoadDeleteOrderOrderReducer(
  state: LoadDeleteOrderOrderState = initialLoadDeleteOrderOrderState,
  action: actions.AllLoadDeleteOrderOrderActions): LoadDeleteOrderOrderState {

  switch (action.type) {
  case actions.LOAD_DELETEORDER_ORDER_START:
  return {...state, loading: true, error: null};

  case actions.LOAD_DELETEORDER_ORDER_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.LOAD_DELETEORDER_ORDER_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
