/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';

import * as actions from './actions';

export interface ProductsState {
  data: __model.Products;
  loading: boolean;
  error: string;
}

export const initialProductsState: ProductsState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Products';
export const getProductsStateSelector = createFeatureSelector<ProductsState>(selectorName);

export function ProductsReducer(
  state: ProductsState = initialProductsState,
  action: actions.ProductsAction): ProductsState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
