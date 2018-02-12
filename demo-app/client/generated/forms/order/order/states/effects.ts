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
import {OrderService} from '../../../../controllers/Order';
import {CREATE_ORDER_ORDER_START, CreateOrderOrderError, CreateOrderOrderStart, CreateOrderOrderSuccess} from './actions';

@Injectable()
export class CreateOrderOrderEffects {
  @Effect()
  CreateOrderOrder = this.actions.ofType<CreateOrderOrderStart>(CREATE_ORDER_ORDER_START).pipe(
    switchMap((action: CreateOrderOrderStart) => this.orderService.order(action.payload).pipe(
      map(CreateOrderOrder => new CreateOrderOrderSuccess(CreateOrderOrder)),
      catchError((error: Error) => of(new CreateOrderOrderError(error.message))),
  )));

  constructor(
    private actions: Actions,
    private orderService: OrderService,
  ) {}
}
