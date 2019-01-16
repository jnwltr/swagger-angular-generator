/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {GetGoodsListParams} from '../../../../controllers/Goods';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Goods getGoodsList] Start',
  SUCCESS = '[Goods getGoodsList] Success',
  ERROR = '[Goods getGoodsList] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetGoodsListParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<__model.GetGoodsListGeneratedInlineModel>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetGoodsListAction = Start | Success | Error;
