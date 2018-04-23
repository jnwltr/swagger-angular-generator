/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';

import * as actions from './actions';

export interface ProductDetailState {
  data: __model.ProductDetail;
  loading: boolean;
  error: string;
}

export const initialProductDetailState: ProductDetailState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'ProductDetail';
export const getProductDetailStateSelector = createFeatureSelector<ProductDetailState>(selectorName);

export function ProductDetailReducer(
  state: ProductDetailState = initialProductDetailState,
  action: actions.ProductDetailAction): ProductDetailState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
