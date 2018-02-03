/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './RestAuthUserPartialUpdate.routes';
import {RestAuthRestAuthUserPartialUpdateComponent} from './RestAuthUserPartialUpdate.component';
import {RestAuthService} from '../../../controllers/RestAuth';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UpdateRestAuthRestAuthUserPartialUpdateReducer} from './states/reducers';
import {UpdateRestAuthRestAuthUserPartialUpdateEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('UpdateRestAuthRestAuthUserPartialUpdate', UpdateRestAuthRestAuthUserPartialUpdateReducer),
    EffectsModule.forFeature([UpdateRestAuthRestAuthUserPartialUpdateEffects]),
  ],
  declarations: [
    RestAuthRestAuthUserPartialUpdateComponent,
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthRestAuthUserPartialUpdateModule {
}
