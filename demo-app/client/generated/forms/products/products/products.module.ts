/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {ProductsService} from '../../../controllers/Products';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadProductsProductsReducer} from './states/reducers';
import {LoadProductsProductsEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('LoadProductsProducts', LoadProductsProductsReducer),
    EffectsModule.forFeature([LoadProductsProductsEffects]),
  ],
  declarations: [
  ],
  providers: [
    ProductsService,
  ],
})
export class ProductsProductsModule {
}
