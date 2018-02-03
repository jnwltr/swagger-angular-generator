/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './RestAuthLogoutCreate.routes';
import {RestAuthRestAuthLogoutCreateComponent} from './RestAuthLogoutCreate.component';
import {RestAuthService} from '../../../controllers/RestAuth';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CreateRestAuthRestAuthLogoutCreateReducer} from './states/reducers';
import {CreateRestAuthRestAuthLogoutCreateEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('CreateRestAuthRestAuthLogoutCreate', CreateRestAuthRestAuthLogoutCreateReducer),
    EffectsModule.forFeature([CreateRestAuthRestAuthLogoutCreateEffects]),
  ],
  declarations: [
    RestAuthRestAuthLogoutCreateComponent,
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthRestAuthLogoutCreateModule {
}
