/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ProductsService} from '../../../controllers/Products';
import {CREATE_ORDER_ORDER_START, CreateOrderOrderError, CreateOrderOrderStart, CreateOrderOrderSuccess} from './actions';

@Injectable()
export class LoadProductsProductsEffects {

  constructor(
    private actions: Actions,
    private productsService: ProductsService,
  ) {}

  @Effect()
  LoadProductsProducts = this.actions.ofType<LoadProductsProductsStart>(LOAD_PRODUCTS_PRODUCTS_START).pipe(
    switchMap((action: LoadProductsProductsStart) => this.productsService.products(action.payload).pipe(
      map(LoadProductsProducts => new LoadProductsProductsSuccess(LoadProductsProducts)),
      catchError((error: Error) => of(new LoadProductsProductsError(error.message))),
  )));
}
