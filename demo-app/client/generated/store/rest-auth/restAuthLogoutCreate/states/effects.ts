/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';

import {catchError, map, switchMap} from 'rxjs/operators';
import {RestAuthService} from '../../../../controllers/RestAuth';
import * as actions from './actions';

@Injectable()
export class RestAuthLogoutCreateEffects {
  @Effect()
  RestAuthLogoutCreate = this.storeActions.pipe(
    ofType<actions.Start>(actions.Actions.START),
    switchMap(() => this.restauthService.restAuthLogoutCreateWithResponse()
      .pipe(
        map(result => new actions.Success(result)),
        catchError((error: HttpErrorResponse) => of(new actions.Error(error))),
      ),
    ),
  );

  constructor(
    private storeActions: Actions,
    private restauthService: RestAuthService,
  ) {}
}
