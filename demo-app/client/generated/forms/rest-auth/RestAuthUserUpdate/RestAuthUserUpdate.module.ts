/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './RestAuthUserUpdate.routes';
import {RestAuthRestAuthUserUpdateComponent} from './RestAuthUserUpdate.component';
import {RestAuthService} from '../../../controllers/RestAuth';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UpdateRestAuthRestAuthUserUpdateReducer} from './states/reducers';
import {UpdateRestAuthRestAuthUserUpdateEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('UpdateRestAuthRestAuthUserUpdate', UpdateRestAuthRestAuthUserUpdateReducer),
    EffectsModule.forFeature([UpdateRestAuthRestAuthUserUpdateEffects]),
  ],
  declarations: [
    RestAuthRestAuthUserUpdateComponent,
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthRestAuthUserUpdateModule {
}
