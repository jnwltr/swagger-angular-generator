/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Goods_get-goods-list_listParams} from '../../../../controllers/Goods';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Goods goods_get-goods-list_list] Start',
  SUCCESS = '[Goods goods_get-goods-list_list] Success',
  ERROR = '[Goods goods_get-goods-list_list] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: Goods_get-goods-list_listParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.Goods_get-goods-list_listGeneratedInlineModel) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type Goods_get-goods-list_listAction = Start | Success | Error;
