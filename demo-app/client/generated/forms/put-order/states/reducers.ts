/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import * as actions from './actions';

export interface UpdatePutOrderOrderState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialUpdatePutOrderOrderState: UpdatePutOrderOrderState = {
  data: {},
  loading: false,
  error: '',
};

export function UpdatePutOrderOrderReducer(
  state: UpdatePutOrderOrderState = initialUpdatePutOrderOrderState,
  action: actions.AllUpdatePutOrderOrderActions): UpdatePutOrderOrderState {

  switch (action.type) {
  case actions.UPDATE_PUTORDER_ORDER_START:
  return {...state, loading: true, error: null};

  case actions.UPDATE_PUTORDER_ORDER_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.UPDATE_PUTORDER_ORDER_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
