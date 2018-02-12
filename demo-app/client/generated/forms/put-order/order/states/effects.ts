/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, map, switchMap} from 'rxjs/operators';
import {PutOrderService} from '../../../../controllers/PutOrder';
import {UPDATE_PUTORDER_ORDER_START, UpdatePutOrderOrderError, UpdatePutOrderOrderStart, UpdatePutOrderOrderSuccess} from './actions';

@Injectable()
export class UpdatePutOrderOrderEffects {

  constructor(
    private actions: Actions,
    private putorderService: PutOrderService,
  ) {}

  @Effect()
  UpdatePutOrderOrder = this.actions.ofType<UpdatePutOrderOrderStart>(UPDATE_PUTORDER_ORDER_START).pipe(
    switchMap((action: UpdatePutOrderOrderStart) => this.putorderService.order(action.payload).pipe(
      map(UpdatePutOrderOrder => new UpdatePutOrderOrderSuccess(UpdatePutOrderOrder)),
      catchError((error: Error) => of(new UpdatePutOrderOrderError(error.message))),
  )));
}
