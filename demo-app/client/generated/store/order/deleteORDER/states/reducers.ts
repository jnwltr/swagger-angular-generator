/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import * as actions from './actions';

export interface DeleteORDERState {
  data: object | null;
  loading: boolean;
  error: string | null;
}

export const initialDeleteORDERState: DeleteORDERState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'DeleteORDER';
export const getDeleteORDERStateSelector: MemoizedSelector<object, DeleteORDERState> = createFeatureSelector<DeleteORDERState>(selectorName);

export function DeleteORDERReducer(
  state: DeleteORDERState = initialDeleteORDERState,
  action: actions.DeleteORDERAction): DeleteORDERState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
