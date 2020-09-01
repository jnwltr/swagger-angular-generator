/* tslint:disable:max-line-length no-empty-interface */
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
import {Structures_mapFormService} from './structures_map.service';

import {Structures_mapEffects} from './states/effects';
import {Structures_mapReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, Structures_mapReducer),
    NgrxEffectsModule.forFeature([Structures_mapEffects]),
  ],
  providers: [
    StructuresService,
    Structures_mapFormService,
  ],
})
export class Structures_mapModule {}
