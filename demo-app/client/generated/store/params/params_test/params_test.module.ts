/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {ParamsService} from '../../../controllers/Params';
import {FormsSharedModule} from '../../forms-shared.module';
import {Params_testFormService} from './params_test.service';

import {Params_testEffects} from './states/effects';
import {Params_testReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, Params_testReducer),
    NgrxEffectsModule.forFeature([Params_testEffects]),
  ],
  providers: [
    ParamsService,
    Params_testFormService,
  ],
})
export class Params_testModule {}
