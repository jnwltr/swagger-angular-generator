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
import {LoginService} from '../../../../controllers/Login';
import {CREATE_LOGIN_LOGIN_START, CreateLoginLoginError, CreateLoginLoginStart, CreateLoginLoginSuccess} from './actions';

@Injectable()
export class CreateLoginLoginEffects {
  @Effect()
  CreateLoginLogin = this.actions.ofType<CreateLoginLoginStart>(CREATE_LOGIN_LOGIN_START).pipe(
    switchMap((action: CreateLoginLoginStart) => this.loginService.login(action.payload).pipe(
      map(CreateLoginLogin => new CreateLoginLoginSuccess(CreateLoginLogin)),
      catchError((error: Error) => of(new CreateLoginLoginError(error.message))),
  )));

  constructor(
    private actions: Actions,
    private loginService: LoginService,
  ) {}
}
