/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as __model from '../../../../model';
import * as actions from './actions';

export interface Structures_arrayState {
  data: __model.Structures_arrayGeneratedInlineModel | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialStructures_arrayState: Structures_arrayState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Structures_Structures_array';
export const getStructures_arrayStateSelector = createFeatureSelector<Structures_arrayState>(selectorName);

export function Structures_arrayReducer(
  state: Structures_arrayState = initialStructures_arrayState,
  action: actions.Structures_arrayAction): Structures_arrayState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
