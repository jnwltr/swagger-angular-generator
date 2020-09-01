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

export interface Ticketing_show-ticket-detail_readState {
  data: __model.TicketDetailOutput[] | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialTicketing_show-ticket-detail_readState: Ticketing_show-ticket-detail_readState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Ticketing_Ticketing_show-ticket-detail_read';
export const getTicketing_show-ticket-detail_readStateSelector = createFeatureSelector<Ticketing_show-ticket-detail_readState>(selectorName);

export function Ticketing_show-ticket-detail_readReducer(
  state: Ticketing_show-ticket-detail_readState = initialTicketing_show-ticket-detail_readState,
  action: actions.Ticketing_show-ticket-detail_readAction): Ticketing_show-ticket-detail_readState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
