/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {OrderService} from '../../../controllers/Order';
import {FormsSharedModule} from '../../forms-shared.module';
import {PatchOrderFormService} from './patchOrder.service';

import {PatchOrderEffects} from './states/effects';
import {PatchOrderReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, PatchOrderReducer),
    NgrxEffectsModule.forFeature([PatchOrderEffects]),
  ],
  providers: [
    OrderService,
    PatchOrderFormService,
  ],
})
export class PatchOrderModule {}
