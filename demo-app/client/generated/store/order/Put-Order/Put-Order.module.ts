/* tslint:disable:max-line-length no-empty-interface */
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
import {Put-OrderFormService} from './Put-Order.service';

import {Put-OrderEffects} from './states/effects';
import {Put-OrderReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, Put-OrderReducer),
    NgrxEffectsModule.forFeature([Put-OrderEffects]),
  ],
  providers: [
    OrderService,
    Put-OrderFormService,
  ],
})
export class Put-OrderModule {}
