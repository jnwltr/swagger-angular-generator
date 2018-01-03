/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './order.routes';
import {OrderComponent} from './order.component';
import {OrderService} from '../../controllers/Order';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CreateOrderOrderReducer} from './states/reducers';
import {CreateOrderOrderEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('CreateOrderOrder', CreateOrderOrderReducer),
    EffectsModule.forFeature([CreateOrderOrderEffects]),
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
