/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {RestAuthService} from '../../../controllers/RestAuth';
import {FormsSharedModule} from '../../forms-shared.module';
import {RestAuthUserUpdateFormService} from './restAuthUserUpdate.service';

import {RestAuthUserUpdateEffects} from './states/effects';
import {RestAuthUserUpdateReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, RestAuthUserUpdateReducer),
    NgrxEffectsModule.forFeature([RestAuthUserUpdateEffects]),
  ],
  providers: [
    RestAuthService,
    RestAuthUserUpdateFormService,
  ],
})
export class RestAuthUserUpdateModule {}
