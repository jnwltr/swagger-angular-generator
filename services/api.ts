import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { AuthService } from './auth';

@Injectable()
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: Http, private authService: AuthService) {}

  get(url: string, query?: object): Observable<any> {
    return this.request(RequestMethod.Get, url, undefined, query);
  }

  /**
   * @param data to be sent
   * @param form form data used for files, has precedence over data
   */
  post(url: string, data?: any, query?: object, form?: {[key: string]: File}): Observable<any> {
    let formData: FormData;
    if (form) {
      formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
    }

    return this.request(RequestMethod.Post, url, formData || data, query);
  }

  put(url: string, data?: any, query?: object): Observable<any> {
    return this.request(RequestMethod.Put, url, data, query);
  }

  delete(url: string): Observable<any> {
    return this.request(RequestMethod.Delete, url);
  }

  protected request(method: RequestMethod, url: string, data?: any, query?: object) {
    const options = new RequestOptions({
      body: data,
      headers: this.authHeaders,
      method,
      params: query,
      withCredentials: true,
    });

    return this.http.request(`${this.apiUrl}${url}`, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected extractData(res: Response) {
    try {
      return res.json();
    } catch (err) {
      return res.text();
    }
  }

  protected handleError(error: Response | any): Observable<{code: string, message: string}> {
    let message: string;
    let code: number;

    if (error instanceof Response) {
      try {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        message = `${err}`;
      } catch (jsonError) {
        message = error.text();
      }
      code = error.status;
    } else {
      message = error.message ? error.message : error.toString();
      code = error.code ? error.code : 500;
    }

    const httpError = { code, message };

    return Observable.throw(httpError);
  }

  protected get authHeaders(): Headers {
    const token = this.authService.authTokenWithExpirationCheck;
    if (!token) {
      return new Headers();
    }

    return new Headers({ Authorization: token });
  }
}
