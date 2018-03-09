/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {OrderComponent} from './order.component';
import {FormsSharedModule} from '../../forms-shared.module';
import {OrderService} from '../../../controllers/Order';
import {OrderEffects} from './states/effects';
import {OrderReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('Order', OrderReducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
  declarations: [
    OrderComponent,
  ],
  providers: [
    OrderService,
  ],
})
export class OrderModule {
}
