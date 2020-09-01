/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface CareerState {
  data: object | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialCareerState: CareerState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Career_Career';
export const getCareerStateSelector = createFeatureSelector<CareerState>(selectorName);

export function CareerReducer(
  state: CareerState = initialCareerState,
  action: actions.CareerAction): CareerState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
