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
import {DeleteOrderService} from '../../../../controllers/DeleteOrder';
import {LOAD_DELETEORDER_ORDER_START, LoadDeleteOrderOrderError, LoadDeleteOrderOrderStart, LoadDeleteOrderOrderSuccess} from './actions';

@Injectable()
export class LoadDeleteOrderOrderEffects {
  @Effect()
  LoadDeleteOrderOrder = this.actions.ofType<LoadDeleteOrderOrderStart>(LOAD_DELETEORDER_ORDER_START).pipe(
    switchMap((action: LoadDeleteOrderOrderStart) => this.deleteorderService.order().pipe(
      map(LoadDeleteOrderOrder => new LoadDeleteOrderOrderSuccess(LoadDeleteOrderOrder)),
      catchError((error: Error) => of(new LoadDeleteOrderOrderError(error.message))),
  )));

  constructor(
    private actions: Actions,
    private deleteorderService: DeleteOrderService,
  ) {}
}
