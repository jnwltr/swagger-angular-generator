/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ShowTicketDetailParams} from '../../../../controllers/Ticketing';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Ticketing showTicketDetail] Start',
  SUCCESS = '[Ticketing showTicketDetail] Success',
  ERROR = '[Ticketing showTicketDetail] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ShowTicketDetailParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.TicketDetailOutput[]) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type ShowTicketDetailAction = Start | Success | Error;
