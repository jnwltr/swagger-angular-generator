/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import * as actions from './actions';

export interface LoadProductDetailProductDetailState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialLoadProductDetailProductDetailState: LoadProductDetailProductDetailState = {
  data: {},
  loading: false,
  error: '',
};

export function LoadProductDetailProductDetailReducer(
  state: LoadProductDetailProductDetailState = initialLoadProductDetailProductDetailState,
  action: actions.AllLoadProductDetailProductDetailActions): LoadProductDetailProductDetailState {

  switch (action.type) {
  case actions.LOAD_PRODUCTDETAIL_PRODUCTDETAIL_START:
  return {...state, loading: true, error: null};

  case actions.LOAD_PRODUCTDETAIL_PRODUCTDETAIL_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.LOAD_PRODUCTDETAIL_PRODUCTDETAIL_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
