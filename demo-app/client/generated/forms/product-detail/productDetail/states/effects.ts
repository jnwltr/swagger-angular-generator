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
import {LOAD_PRODUCTDETAIL_PRODUCTDETAIL_START, LoadProductDetailProductDetailError, LoadProductDetailProductDetailStart, LoadProductDetailProductDetailSuccess} from './actions';

@Injectable()
export class LoadProductDetailProductDetailEffects {
  @Effect()
  LoadProductDetailProductDetail = this.actions.ofType<LoadProductDetailProductDetailStart>(LOAD_PRODUCTDETAIL_PRODUCTDETAIL_START).pipe(
    switchMap((action: LoadProductDetailProductDetailStart) => this.productdetailService.productDetail().pipe(
      map(LoadProductDetailProductDetail => new LoadProductDetailProductDetailSuccess(LoadProductDetailProductDetail)),
      catchError((error: Error) => of(new LoadProductDetailProductDetailError(error.message))),
  )));

  constructor(
    private actions: Actions,
    private productdetailService: ProductDetailService,
  ) {}
}
