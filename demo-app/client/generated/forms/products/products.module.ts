/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './products.routes';
import {ProductsComponent} from './products.component';
import {ProductsService} from '../../controllers/Products';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadProductsProductsReducer} from './states/reducers';
import {LoadProductsProductsEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('LoadProductsProducts', LoadProductsProductsReducer),
    EffectsModule.forFeature([LoadProductsProductsEffects]),
  ],
  declarations: [
    ProductsComponent,
  ],
  providers: [
    ProductsService,
  ],
})
export class ProductsModule {
}
