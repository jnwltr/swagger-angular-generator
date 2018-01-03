/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, map, switchMap} from 'rxjs/operators';
import {DeleteOrderService} from '../../../controllers/DeleteOrder';
import {CREATE_ORDER_ORDER_START, CreateOrderOrderError, CreateOrderOrderStart, CreateOrderOrderSuccess} from './actions';

@Injectable()
export class LoadDeleteOrderOrderEffects {

  constructor(
    private actions: Actions,
    private deleteorderService: DeleteOrderService,
  ) {}

  @Effect()
  LoadDeleteOrderOrder = this.actions.ofType<LoadDeleteOrderOrderStart>(LOAD_DELETEORDER_ORDER_START).pipe(
    switchMap((action: LoadDeleteOrderOrderStart) => this.deleteorderService.order(action.payload).pipe(
      map(LoadDeleteOrderOrder => new LoadDeleteOrderOrderSuccess(LoadDeleteOrderOrder)),
      catchError((error: Error) => of(new LoadDeleteOrderOrderError(error.message))),
  )));
}
