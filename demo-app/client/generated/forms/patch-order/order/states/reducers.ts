/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface UpdatePatchOrderOrderState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialUpdatePatchOrderOrderState: UpdatePatchOrderOrderState = {
  data: {},
  loading: false,
  error: '',
};

export const getUpdatePatchOrderOrderStateSelector = createFeatureSelector<UpdatePatchOrderOrderState>('UpdatePatchOrderOrder');

export function UpdatePatchOrderOrderReducer(
  state: UpdatePatchOrderOrderState = initialUpdatePatchOrderOrderState,
  action: actions.AllUpdatePatchOrderOrderActions): UpdatePatchOrderOrderState {

  switch (action.type) {
  case actions.UPDATE_PATCHORDER_ORDER_START:
  return {...state, loading: true, error: null};

  case actions.UPDATE_PATCHORDER_ORDER_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.UPDATE_PATCHORDER_ORDER_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
