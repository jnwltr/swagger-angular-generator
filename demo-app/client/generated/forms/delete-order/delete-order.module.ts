/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './delete-order.routes';
import {DeleteOrderComponent} from './delete-order.component';
import {DeleteOrderService} from '../../controllers/DeleteOrder';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadDeleteOrderOrderReducer} from './states/reducers';
import {LoadDeleteOrderOrderEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('LoadDeleteOrderOrder', LoadDeleteOrderOrderReducer),
    EffectsModule.forFeature([LoadDeleteOrderOrderEffects]),
  ],
  declarations: [
    DeleteOrderComponent,
  ],
  providers: [
    DeleteOrderService,
  ],
})
export class DeleteOrderModule {
}
