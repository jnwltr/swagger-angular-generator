/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {RestAuthUserUpdateComponent} from './RestAuthUserUpdate.component';
import {FormsSharedModule} from '../../forms-shared.module';
import {RestAuthService} from '../../../controllers/RestAuth';
import {RestAuthUserUpdateEffects} from './states/effects';
import {RestAuthUserUpdateReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('RestAuthUserUpdate', RestAuthUserUpdateReducer),
    EffectsModule.forFeature([RestAuthUserUpdateEffects]),
  ],
  declarations: [
    RestAuthUserUpdateComponent,
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthUserUpdateModule {
}
