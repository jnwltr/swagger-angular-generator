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
import * as actions from './actions';

@Injectable()
export class OrderEffects {
  @Effect()
  Order = this.storeActions.ofType<actions.Start>(actions.Actions.START).pipe(
    switchMap((action: actions.Start) => this.putorderService.order(action.payload).pipe(
      map(result => new actions.Success(result)),
      catchError((error: Error) => of(new actions.Error(error.message))),
  )));

  constructor(
    private storeActions: Actions,
    private putorderService: PutOrderService,
  ) {}
}
