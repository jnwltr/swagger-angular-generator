/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {RegistrationParams} from '../../../../controllers/Registration';
import * as model from '../../../../model';

export const CREATE_REGISTRATION_REGISTRATION_START = '[Registration] Load Registration';
export const CREATE_REGISTRATION_REGISTRATION_SUCCESS = '[Registration] Load Registration Success';
export const CREATE_REGISTRATION_REGISTRATION_ERROR = '[Registration] Load Registration Error';

export class CreateRegistrationRegistrationStart implements Action {
  readonly type = CREATE_REGISTRATION_REGISTRATION_START;
  constructor(public payload: RegistrationParams) {}
}

export class CreateRegistrationRegistrationSuccess implements Action {
  readonly type = CREATE_REGISTRATION_REGISTRATION_SUCCESS;
  constructor(public payload: object) {}
}

export class CreateRegistrationRegistrationError implements Action {
  readonly type = CREATE_REGISTRATION_REGISTRATION_ERROR;
  constructor(public payload: string) {}
}

export type AllCreateRegistrationRegistrationActions
  = CreateRegistrationRegistrationStart
  | CreateRegistrationRegistrationSuccess
  | CreateRegistrationRegistrationError;
