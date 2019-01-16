/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {RestAuthUserUpdateParams} from '../../../../controllers/RestAuth';
import * as __model from '../../../../model';

export enum Actions {
  START = '[RestAuth restAuthUserUpdate] Start',
  SUCCESS = '[RestAuth restAuthUserUpdate] Success',
  ERROR = '[RestAuth restAuthUserUpdate] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: RestAuthUserUpdateParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<__model.UserDetails>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type RestAuthUserUpdateAction = Start | Success | Error;
