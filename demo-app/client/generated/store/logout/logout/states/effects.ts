/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {of} from 'rxjs/observable/of';

import {catchError, map, switchMap} from 'rxjs/operators';
import {LogoutService} from '../../../../controllers/Logout';
import * as actions from './actions';

@Injectable()
export class LogoutEffects {
  @Effect()
  Logout = this.storeActions.ofType<actions.Start>(actions.Actions.START).pipe(
    switchMap(() => this.logoutService.logout()
      .pipe(
        map(result => new actions.Success(result)),
        catchError((error: HttpErrorResponse) => of(new actions.Error(error.message))),
      ),
    ),
  );

  constructor(
    private storeActions: Actions,
    private logoutService: LogoutService,
  ) {}
}
