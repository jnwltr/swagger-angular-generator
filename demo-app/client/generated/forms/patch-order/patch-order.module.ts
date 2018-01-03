/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './patch-order.routes';
import {PatchOrderComponent} from './patch-order.component';
import {PatchOrderService} from '../../controllers/PatchOrder';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UpdatePatchOrderOrderReducer} from './states/reducers';
import {UpdatePatchOrderOrderEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('UpdatePatchOrderOrder', UpdatePatchOrderOrderReducer),
    EffectsModule.forFeature([UpdatePatchOrderOrderEffects]),
  ],
  declarations: [
    PatchOrderComponent,
  ],
  providers: [
    PatchOrderService,
  ],
})
export class PatchOrderModule {
}
