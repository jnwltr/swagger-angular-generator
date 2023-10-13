/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';

import {catchError, map, switchMap} from 'rxjs/operators';
import {TicketingService} from '../../../../controllers/Ticketing';
import * as actions from './actions';

@Injectable()
export class ShowTicketDetailEffects {
  ShowTicketDetail = createEffect(() => this.storeActions.pipe(
    ofType<actions.Start>(actions.Actions.START),
    switchMap((action: actions.Start) => this.ticketingService.showTicketDetail(action.payload)
      .pipe(
        map(result => new actions.Success(result)),
        catchError((error: HttpErrorResponse) => of(new actions.Error(error))),
      ),
    ),
  ));

  constructor(
    private storeActions: Actions,
    private ticketingService: TicketingService,
  ) {}
}
