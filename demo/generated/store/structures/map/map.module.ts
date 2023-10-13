/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {StructuresService} from '../../../controllers/Structures';
import {FormsSharedModule} from '../../forms-shared.module';
import {MapFormService} from './map.service';

import {MapEffects} from './states/effects';
import {MapReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, MapReducer),
    NgrxEffectsModule.forFeature([MapEffects]),
  ],
  providers: [
    StructuresService,
    MapFormService,
  ],
})
export class MapModule {}
