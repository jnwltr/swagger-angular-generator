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
import {RegistrationService} from '../../../../controllers/Registration';
import {CREATE_REGISTRATION_REGISTRATION_START, CreateRegistrationRegistrationError, CreateRegistrationRegistrationStart, CreateRegistrationRegistrationSuccess} from './actions';

@Injectable()
export class CreateRegistrationRegistrationEffects {

  constructor(
    private actions: Actions,
    private registrationService: RegistrationService,
  ) {}

  @Effect()
  CreateRegistrationRegistration = this.actions.ofType<CreateRegistrationRegistrationStart>(CREATE_REGISTRATION_REGISTRATION_START).pipe(
    switchMap((action: CreateRegistrationRegistrationStart) => this.registrationService.registration(action.payload).pipe(
      map(CreateRegistrationRegistration => new CreateRegistrationRegistrationSuccess(CreateRegistrationRegistration)),
      catchError((error: Error) => of(new CreateRegistrationRegistrationError(error.message))),
  )));
}
