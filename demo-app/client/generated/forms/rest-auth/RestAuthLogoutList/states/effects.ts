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
import {LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_START, LoadRestAuthRestAuthLogoutListError, LoadRestAuthRestAuthLogoutListStart, LoadRestAuthRestAuthLogoutListSuccess} from './actions';

@Injectable()
export class LoadRestAuthRestAuthLogoutListEffects {

  constructor(
    private actions: Actions,
    private restauthService: RestAuthService,
  ) {}

  @Effect()
  LoadRestAuthRestAuthLogoutList = this.actions.ofType<LoadRestAuthRestAuthLogoutListStart>(LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_START).pipe(
    switchMap((action: LoadRestAuthRestAuthLogoutListStart) => this.restauthService.RestAuthLogoutList().pipe(
      map(LoadRestAuthRestAuthLogoutList => new LoadRestAuthRestAuthLogoutListSuccess(LoadRestAuthRestAuthLogoutList)),
      catchError((error: Error) => of(new LoadRestAuthRestAuthLogoutListError(error.message))),
  )));
}
