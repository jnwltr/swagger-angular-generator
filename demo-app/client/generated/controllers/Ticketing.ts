/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface ShowTicketDetailParams {
  /** format: date-time */
  date_from?: string;
  /** format: date-time */
  date_to?: string;
  id: number;
}

@Injectable()
export class TicketingService {
  constructor(private http: HttpClient) {}

  /**
   * show_ticket_detail
   * http://example.com/swagger/swagger-ui.html#!/ticketing/ticketing_show-ticket-detail_read
   */
  showTicketDetail(params: ShowTicketDetailParams): Observable<__model.TicketDetailOutput[]> {
    const queryParamBase = {
      date_from: params.date_from,
      date_to: params.date_to,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.TicketDetailOutput[]>(`/api-base-path/ticketing/show-ticket-detail/${pathParams.id}/`, {params: queryParams});
  }
}
