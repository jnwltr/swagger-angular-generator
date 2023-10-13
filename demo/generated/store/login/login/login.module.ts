/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {LoginService} from '../../../controllers/Login';
import {FormsSharedModule} from '../../forms-shared.module';
import {LoginFormService} from './login.service';

import {LoginEffects} from './states/effects';
import {LoginReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, LoginReducer),
    NgrxEffectsModule.forFeature([LoginEffects]),
  ],
  providers: [
    LoginService,
    LoginFormService,
  ],
})
export class LoginModule {}
