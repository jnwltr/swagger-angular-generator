/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {RegistrationComponent} from './registration.component';
import {FormsSharedModule} from '../../forms-shared.module';
import {RegistrationService} from '../../../controllers/Registration';
import {RegistrationEffects} from './states/effects';
import {RegistrationReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('Registration', RegistrationReducer),
    EffectsModule.forFeature([RegistrationEffects]),
  ],
  declarations: [
    RegistrationComponent,
  ],
  providers: [
    RegistrationService,
  ],
})
export class RegistrationModule {
}
