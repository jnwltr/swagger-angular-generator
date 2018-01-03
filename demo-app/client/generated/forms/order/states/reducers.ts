/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import * as actions from './actions';

export interface CreateOrderOrderState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialCreateOrderOrderState: CreateOrderOrderState = {
  data: {},
  loading: false,
  error: '',
};

export function CreateOrderOrderReducer(
  state: CreateOrderOrderState = initialCreateOrderOrderState,
  action: actions.AllCreateOrderOrderActions): CreateOrderOrderState {

  switch (action.type) {
  case actions.CREATE_ORDER_ORDER_START:
  return {...state, loading: true, error: null};

  case actions.CREATE_ORDER_ORDER_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.CREATE_ORDER_ORDER_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
