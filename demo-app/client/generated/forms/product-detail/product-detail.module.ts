/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './product-detail.routes';
import {ProductDetailComponent} from './product-detail.component';
import {ProductDetailService} from '../../controllers/ProductDetail';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadProductDetailProductDetailReducer} from './states/reducers';
import {LoadProductDetailProductDetailEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('LoadProductDetailProductDetail', LoadProductDetailProductDetailReducer),
    EffectsModule.forFeature([LoadProductDetailProductDetailEffects]),
  ],
  declarations: [
    ProductDetailComponent,
  ],
  providers: [
    ProductDetailService,
  ],
})
export class ProductDetailModule {
}
