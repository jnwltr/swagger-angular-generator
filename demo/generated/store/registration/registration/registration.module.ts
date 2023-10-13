/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {RegistrationService} from '../../../controllers/Registration';
import {FormsSharedModule} from '../../forms-shared.module';
import {RegistrationFormService} from './registration.service';

import {RegistrationEffects} from './states/effects';
import {RegistrationReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, RegistrationReducer),
    NgrxEffectsModule.forFeature([RegistrationEffects]),
  ],
  providers: [
    RegistrationService,
    RegistrationFormService,
  ],
})
export class RegistrationModule {}
