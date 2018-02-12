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
import {CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_START, CreateRestAuthRestAuthLogoutCreateError, CreateRestAuthRestAuthLogoutCreateStart, CreateRestAuthRestAuthLogoutCreateSuccess} from './actions';

@Injectable()
export class CreateRestAuthRestAuthLogoutCreateEffects {
  @Effect()
  CreateRestAuthRestAuthLogoutCreate = this.actions.ofType<CreateRestAuthRestAuthLogoutCreateStart>(CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_START).pipe(
    switchMap((action: CreateRestAuthRestAuthLogoutCreateStart) => this.restauthService.RestAuthLogoutCreate().pipe(
      map(CreateRestAuthRestAuthLogoutCreate => new CreateRestAuthRestAuthLogoutCreateSuccess(CreateRestAuthRestAuthLogoutCreate)),
      catchError((error: Error) => of(new CreateRestAuthRestAuthLogoutCreateError(error.message))),
  )));

  constructor(
    private actions: Actions,
    private restauthService: RestAuthService,
  ) {}
}
