/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {DeleteOrderService} from '../../../controllers/DeleteOrder';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadDeleteOrderOrderReducer} from './states/reducers';
import {LoadDeleteOrderOrderEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('LoadDeleteOrderOrder', LoadDeleteOrderOrderReducer),
    EffectsModule.forFeature([LoadDeleteOrderOrderEffects]),
  ],
  declarations: [
  ],
  providers: [
    DeleteOrderService,
  ],
})
export class DeleteOrderOrderModule {
}
