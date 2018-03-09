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
import {ProductsService} from '../../../controllers/Products';
import {ProductsEffects} from './states/effects';
import {ProductsReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('Products', ProductsReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  declarations: [
  ],
  providers: [
    ProductsService,
  ],
})
export class ProductsModule {
}
