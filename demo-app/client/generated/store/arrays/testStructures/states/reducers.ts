/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import * as __model from '../../../../model';
import * as actions from './actions';

export interface TestStructuresState {
  data: __model.TestStructuresGeneratedInlineModel | null;
  loading: boolean;
  error: string | null;
}

export const initialTestStructuresState: TestStructuresState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Arrays_TestStructures';
export const getTestStructuresStateSelector = createFeatureSelector<TestStructuresState>(selectorName);

export function TestStructuresReducer(
  state: TestStructuresState = initialTestStructuresState,
  action: actions.TestStructuresAction): TestStructuresState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
