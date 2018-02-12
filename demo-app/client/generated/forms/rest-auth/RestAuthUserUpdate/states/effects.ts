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
import {UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_START, UpdateRestAuthRestAuthUserUpdateError, UpdateRestAuthRestAuthUserUpdateStart, UpdateRestAuthRestAuthUserUpdateSuccess} from './actions';

@Injectable()
export class UpdateRestAuthRestAuthUserUpdateEffects {
  @Effect()
  UpdateRestAuthRestAuthUserUpdate = this.actions.ofType<UpdateRestAuthRestAuthUserUpdateStart>(UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_START).pipe(
    switchMap((action: UpdateRestAuthRestAuthUserUpdateStart) => this.restauthService.RestAuthUserUpdate(action.payload).pipe(
      map(UpdateRestAuthRestAuthUserUpdate => new UpdateRestAuthRestAuthUserUpdateSuccess(UpdateRestAuthRestAuthUserUpdate)),
      catchError((error: Error) => of(new UpdateRestAuthRestAuthUserUpdateError(error.message))),
  )));

  constructor(
    private actions: Actions,
    private restauthService: RestAuthService,
  ) {}
}
