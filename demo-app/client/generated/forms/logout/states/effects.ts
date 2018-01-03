/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LogoutService} from '../../../controllers/Logout';
import {CREATE_ORDER_ORDER_START, CreateOrderOrderError, CreateOrderOrderStart, CreateOrderOrderSuccess} from './actions';

@Injectable()
export class CreateLogoutLogoutEffects {

  constructor(
    private actions: Actions,
    private logoutService: LogoutService,
  ) {}

  @Effect()
  CreateLogoutLogout = this.actions.ofType<CreateLogoutLogoutStart>(CREATE_LOGOUT_LOGOUT_START).pipe(
    switchMap((action: CreateLogoutLogoutStart) => this.logoutService.logout(action.payload).pipe(
      map(CreateLogoutLogout => new CreateLogoutLogoutSuccess(CreateLogoutLogout)),
      catchError((error: Error) => of(new CreateLogoutLogoutError(error.message))),
  )));
}
