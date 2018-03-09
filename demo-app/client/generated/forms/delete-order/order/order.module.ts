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
import {DeleteOrderService} from '../../../controllers/DeleteOrder';
import {OrderEffects} from './states/effects';
import {OrderReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('Order', OrderReducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
  declarations: [
  ],
  providers: [
    DeleteOrderService,
  ],
})
export class OrderModule {
}
