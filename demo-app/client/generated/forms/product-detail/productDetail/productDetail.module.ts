/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {FormsSharedModule} from '../../forms-shared.module';
import {ProductDetailService} from '../../../controllers/ProductDetail';
import {ProductDetailEffects} from './states/effects';
import {ProductDetailReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('ProductDetail', ProductDetailReducer),
    EffectsModule.forFeature([ProductDetailEffects]),
  ],
  declarations: [
  ],
  providers: [
    ProductDetailService,
  ],
})
export class ProductDetailModule {
}
