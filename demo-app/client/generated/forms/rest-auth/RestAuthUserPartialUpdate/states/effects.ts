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
import {UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_START, UpdateRestAuthRestAuthUserPartialUpdateError, UpdateRestAuthRestAuthUserPartialUpdateStart, UpdateRestAuthRestAuthUserPartialUpdateSuccess} from './actions';

@Injectable()
export class UpdateRestAuthRestAuthUserPartialUpdateEffects {

  constructor(
    private actions: Actions,
    private restauthService: RestAuthService,
  ) {}

  @Effect()
  UpdateRestAuthRestAuthUserPartialUpdate = this.actions.ofType<UpdateRestAuthRestAuthUserPartialUpdateStart>(UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_START).pipe(
    switchMap((action: UpdateRestAuthRestAuthUserPartialUpdateStart) => this.restauthService.RestAuthUserPartialUpdate(action.payload).pipe(
      map(UpdateRestAuthRestAuthUserPartialUpdate => new UpdateRestAuthRestAuthUserPartialUpdateSuccess(UpdateRestAuthRestAuthUserPartialUpdate)),
      catchError((error: Error) => of(new UpdateRestAuthRestAuthUserPartialUpdateError(error.message))),
  )));
}
