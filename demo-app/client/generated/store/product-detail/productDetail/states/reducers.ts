/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as __model from '../../../../model';
import * as actions from './actions';

export interface ProductDetailState {
  data: __model.ProductDetail | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  res: HttpResponse<__model.ProductDetail> | null;
}

export const initialProductDetailState: ProductDetailState = {
  data: null,
  loading: false,
  error: null,
  res: null,
};

export const selectorName = 'ProductDetail_ProductDetail';
export const getProductDetailStateSelector = createFeatureSelector<ProductDetailState>(selectorName);

export function ProductDetailReducer(
  state: ProductDetailState = initialProductDetailState,
  action: actions.ProductDetailAction): ProductDetailState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {
      ...state,
      data: action.payload.body,
      res: action.payload,
      loading: false,
    };
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
