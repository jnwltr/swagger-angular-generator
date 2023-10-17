/* tslint:disable:max-line-length */
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
import {DashedFormService} from './dashed.service';

import {DashedEffects} from './states/effects';
import {DashedReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, DashedReducer),
    NgrxEffectsModule.forFeature([DashedEffects]),
  ],
  providers: [
    ParamsService,
    DashedFormService,
  ],
})
export class DashedModule {}
