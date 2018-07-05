/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import * as actions from './actions';

export interface OrderState {
  data: object | null;
  loading: boolean;
  error: string | null;
}

export const initialOrderState: OrderState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Order';
export const getOrderStateSelector: MemoizedSelector<object, OrderState> = createFeatureSelector<OrderState>(selectorName);

export function OrderReducer(
  state: OrderState = initialOrderState,
  action: actions.OrderAction): OrderState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
