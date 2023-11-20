/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {ProductDetailService} from '../../../controllers/ProductDetail';
import {FormsSharedModule} from '../../forms-shared.module';
import {ProductDetailFormService} from './productDetail.service';

import {ProductDetailEffects} from './states/effects';
import {ProductDetailReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, ProductDetailReducer),
    NgrxEffectsModule.forFeature([ProductDetailEffects]),
  ],
  providers: [
    ProductDetailService,
    ProductDetailFormService,
  ],
})
export class ProductDetailModule {}
