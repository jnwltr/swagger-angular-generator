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

import {Rest-auth_logout_listEffects} from './states/effects';
import {Rest-auth_logout_listReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, Rest-auth_logout_listReducer),
    NgrxEffectsModule.forFeature([Rest-auth_logout_listEffects]),
  ],
  providers: [
    RestAuthService,
  ],
})
export class Rest-auth_logout_listModule {}
