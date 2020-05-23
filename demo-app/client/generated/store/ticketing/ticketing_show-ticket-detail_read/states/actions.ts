/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Ticketing_show-ticket-detail_readParams} from '../../../../controllers/Ticketing';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Ticketing ticketing_show-ticket-detail_read] Start',
  SUCCESS = '[Ticketing ticketing_show-ticket-detail_read] Success',
  ERROR = '[Ticketing ticketing_show-ticket-detail_read] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: Ticketing_show-ticket-detail_readParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.TicketDetailOutput[]) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type Ticketing_show-ticket-detail_readAction = Start | Success | Error;
