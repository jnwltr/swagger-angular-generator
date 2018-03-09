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
import {ProductDetailService} from '../../../../controllers/ProductDetail';
import * as actions from './actions';

@Injectable()
export class ProductDetailEffects {
  @Effect()
  ProductDetail = this.storeActions.ofType<actions.Start>(actions.Actions.START).pipe(
    switchMap((action: actions.Start) => this.productdetailService.productDetail().pipe(
      map(result => new actions.Success(result)),
      catchError((error: Error) => of(new actions.Error(error.message))),
  )));

  constructor(
    private storeActions: Actions,
    private productdetailService: ProductDetailService,
  ) {}
}
