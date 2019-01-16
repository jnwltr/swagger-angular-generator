/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ProductsParams} from '../../../../controllers/Products';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Products products] Start',
  SUCCESS = '[Products products] Success',
  ERROR = '[Products products] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ProductsParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<__model.Products>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type ProductsAction = Start | Success | Error;
