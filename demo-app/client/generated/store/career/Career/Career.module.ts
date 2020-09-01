/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {CareerService} from '../../../controllers/Career';
import {FormsSharedModule} from '../../forms-shared.module';
import {CareerFormService} from './Career.service';

import {CareerEffects} from './states/effects';
import {CareerReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, CareerReducer),
    NgrxEffectsModule.forFeature([CareerEffects]),
  ],
  providers: [
    CareerService,
    CareerFormService,
  ],
})
export class CareerModule {}
