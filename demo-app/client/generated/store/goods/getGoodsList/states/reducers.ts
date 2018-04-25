/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';

import * as __model from '../../../../model';
import * as actions from './actions';

export interface GetGoodsListState {
  data: __model.GetGoodsListGeneratedInlineModel;
  loading: boolean;
  error: string;
}

export const initialGetGoodsListState: GetGoodsListState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'GetGoodsList';
export const getGetGoodsListStateSelector = createFeatureSelector<GetGoodsListState>(selectorName);

export function GetGoodsListReducer(
  state: GetGoodsListState = initialGetGoodsListState,
  action: actions.GetGoodsListAction): GetGoodsListState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
