/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface Structures_mapState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialStructures_mapState: Structures_mapState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Structures_Structures_map';
export const getStructures_mapStateSelector = createFeatureSelector<Structures_mapState>(selectorName);

export function Structures_mapReducer(
  state: Structures_mapState = initialStructures_mapState,
  action: actions.Structures_mapAction): Structures_mapState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
