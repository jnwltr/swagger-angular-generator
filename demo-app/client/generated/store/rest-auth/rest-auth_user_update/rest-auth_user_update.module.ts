/* tslint:disable:max-line-length no-empty-interface */
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
import {Rest-auth_user_updateFormService} from './rest-auth_user_update.service';

import {Rest-auth_user_updateEffects} from './states/effects';
import {Rest-auth_user_updateReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, Rest-auth_user_updateReducer),
    NgrxEffectsModule.forFeature([Rest-auth_user_updateEffects]),
  ],
  providers: [
    RestAuthService,
    Rest-auth_user_updateFormService,
  ],
})
export class Rest-auth_user_updateModule {}
