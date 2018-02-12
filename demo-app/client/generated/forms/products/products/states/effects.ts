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
import {ProductsService} from '../../../../controllers/Products';
import {LOAD_PRODUCTS_PRODUCTS_START, LoadProductsProductsError, LoadProductsProductsStart, LoadProductsProductsSuccess} from './actions';

@Injectable()
export class LoadProductsProductsEffects {

  constructor(
    private actions: Actions,
    private productsService: ProductsService,
  ) {}

  @Effect()
  LoadProductsProducts = this.actions.ofType<LoadProductsProductsStart>(LOAD_PRODUCTS_PRODUCTS_START).pipe(
    switchMap((action: LoadProductsProductsStart) => this.productsService.products().pipe(
      map(LoadProductsProducts => new LoadProductsProductsSuccess(LoadProductsProducts)),
      catchError((error: Error) => of(new LoadProductsProductsError(error.message))),
  )));
}
