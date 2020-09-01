/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface Put-OrderState {
  data: object | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialPut-OrderState: Put-OrderState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Order_Put-Order';
export const getPut-OrderStateSelector = createFeatureSelector<Put-OrderState>(selectorName);

export function Put-OrderReducer(
  state: Put-OrderState = initialPut-OrderState,
  action: actions.Put-OrderAction): Put-OrderState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
