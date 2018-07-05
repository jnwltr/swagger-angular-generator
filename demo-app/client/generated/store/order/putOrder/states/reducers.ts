/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import * as actions from './actions';

export interface PutOrderState {
  data: object | null;
  loading: boolean;
  error: string | null;
}

export const initialPutOrderState: PutOrderState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'PutOrder';
export const getPutOrderStateSelector: MemoizedSelector<object, PutOrderState> = createFeatureSelector<PutOrderState>(selectorName);

export function PutOrderReducer(
  state: PutOrderState = initialPutOrderState,
  action: actions.PutOrderAction): PutOrderState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
