/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {ProductDetailService} from '../../../controllers/ProductDetail';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadProductDetailProductDetailReducer} from './states/reducers';
import {LoadProductDetailProductDetailEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('LoadProductDetailProductDetail', LoadProductDetailProductDetailReducer),
    EffectsModule.forFeature([LoadProductDetailProductDetailEffects]),
  ],
  declarations: [
  ],
  providers: [
    ProductDetailService,
  ],
})
export class ProductDetailProductDetailModule {
}
