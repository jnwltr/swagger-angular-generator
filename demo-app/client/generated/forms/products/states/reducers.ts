/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import * as actions from './actions';

export interface LoadProductsProductsState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialLoadProductsProductsState: LoadProductsProductsState = {
  data: {},
  loading: false,
  error: '',
};

export function LoadProductsProductsReducer(
  state: LoadProductsProductsState = initialLoadProductsProductsState,
  action: actions.AllLoadProductsProductsActions): LoadProductsProductsState {

  switch (action.type) {
  case actions.LOAD_PRODUCTS_PRODUCTS_START:
  return {...state, loading: true, error: null};

  case actions.LOAD_PRODUCTS_PRODUCTS_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.LOAD_PRODUCTS_PRODUCTS_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
