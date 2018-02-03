/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './registration.routes';
import {RegistrationRegistrationComponent} from './registration.component';
import {RegistrationService} from '../../../controllers/Registration';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CreateRegistrationRegistrationReducer} from './states/reducers';
import {CreateRegistrationRegistrationEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('CreateRegistrationRegistration', CreateRegistrationRegistrationReducer),
    EffectsModule.forFeature([CreateRegistrationRegistrationEffects]),
  ],
  declarations: [
    RegistrationRegistrationComponent,
  ],
  providers: [
    RegistrationService,
  ],
})
export class RegistrationRegistrationModule {
}
