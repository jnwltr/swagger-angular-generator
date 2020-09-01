/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as __model from '../../../../model';
import * as actions from './actions';

export interface Goods_get-goods-list_listState {
  data: __model.Goods_get-goods-list_listGeneratedInlineModel | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialGoods_get-goods-list_listState: Goods_get-goods-list_listState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Goods_Goods_get-goods-list_list';
export const getGoods_get-goods-list_listStateSelector = createFeatureSelector<Goods_get-goods-list_listState>(selectorName);

export function Goods_get-goods-list_listReducer(
  state: Goods_get-goods-list_listState = initialGoods_get-goods-list_listState,
  action: actions.Goods_get-goods-list_listAction): Goods_get-goods-list_listState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
