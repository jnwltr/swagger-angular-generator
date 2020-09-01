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
import {Structures_arrayFormService} from './structures_array.service';

import {Structures_arrayEffects} from './states/effects';
import {Structures_arrayReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, Structures_arrayReducer),
    NgrxEffectsModule.forFeature([Structures_arrayEffects]),
  ],
  providers: [
    StructuresService,
    Structures_arrayFormService,
  ],
})
export class Structures_arrayModule {}
