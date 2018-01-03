/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './put-order.routes';
import {PutOrderComponent} from './put-order.component';
import {PutOrderService} from '../../controllers/PutOrder';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UpdatePutOrderOrderReducer} from './states/reducers';
import {UpdatePutOrderOrderEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('UpdatePutOrderOrder', UpdatePutOrderOrderReducer),
    EffectsModule.forFeature([UpdatePutOrderOrderEffects]),
  ],
  declarations: [
    PutOrderComponent,
  ],
  providers: [
    PutOrderService,
  ],
})
export class PutOrderModule {
}
