/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {ArraysService} from '../../../controllers/Arrays';
import {FormsSharedModule} from '../../forms-shared.module';
import {TestStructuresFormService} from './testStructures.service';

import {TestStructuresEffects} from './states/effects';
import {TestStructuresReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, TestStructuresReducer),
    NgrxEffectsModule.forFeature([TestStructuresEffects]),
  ],
  providers: [
    ArraysService,
    TestStructuresFormService,
  ],
})
export class TestStructuresModule {}
