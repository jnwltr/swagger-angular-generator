/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoginComponent} from './login.component';
import {FormsSharedModule} from '../../forms-shared.module';
import {LoginService} from '../../../controllers/Login';
import {LoginEffects} from './states/effects';
import {LoginReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('Login', LoginReducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService,
  ],
})
export class LoginModule {
}
