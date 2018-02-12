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
import {RestAuthService} from '../../../../controllers/RestAuth';
import {LOAD_RESTAUTH_RESTAUTHUSERREAD_START, LoadRestAuthRestAuthUserReadError, LoadRestAuthRestAuthUserReadStart, LoadRestAuthRestAuthUserReadSuccess} from './actions';

@Injectable()
export class LoadRestAuthRestAuthUserReadEffects {
  @Effect()
  LoadRestAuthRestAuthUserRead = this.actions.ofType<LoadRestAuthRestAuthUserReadStart>(LOAD_RESTAUTH_RESTAUTHUSERREAD_START).pipe(
    switchMap((action: LoadRestAuthRestAuthUserReadStart) => this.restauthService.RestAuthUserRead().pipe(
      map(LoadRestAuthRestAuthUserRead => new LoadRestAuthRestAuthUserReadSuccess(LoadRestAuthRestAuthUserRead)),
      catchError((error: Error) => of(new LoadRestAuthRestAuthUserReadError(error.message))),
  )));

  constructor(
    private actions: Actions,
    private restauthService: RestAuthService,
  ) {}
}
