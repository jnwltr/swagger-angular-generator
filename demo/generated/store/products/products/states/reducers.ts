/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as __model from '../../../../model';
import * as actions from './actions';

export interface ProductsState {
  data: __model.Products | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialProductsState: ProductsState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Products_Products';
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
