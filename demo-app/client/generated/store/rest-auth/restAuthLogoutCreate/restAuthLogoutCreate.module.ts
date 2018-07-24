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

import {RestAuthLogoutCreateEffects} from './states/effects';
import {RestAuthLogoutCreateReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, RestAuthLogoutCreateReducer),
    NgrxEffectsModule.forFeature([RestAuthLogoutCreateEffects]),
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthLogoutCreateModule {}
