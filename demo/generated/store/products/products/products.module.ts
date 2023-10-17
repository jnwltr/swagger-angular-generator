/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {ProductsService} from '../../../controllers/Products';
import {FormsSharedModule} from '../../forms-shared.module';
import {ProductsFormService} from './products.service';

import {ProductsEffects} from './states/effects';
import {ProductsReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, ProductsReducer),
    NgrxEffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [
    ProductsService,
    ProductsFormService,
  ],
})
export class ProductsModule {}
