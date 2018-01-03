/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './login.routes';
import {LoginComponent} from './login.component';
import {LoginService} from '../../controllers/Login';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CreateLoginLoginReducer} from './states/reducers';
import {CreateLoginLoginEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('CreateLoginLogin', CreateLoginLoginReducer),
    EffectsModule.forFeature([CreateLoginLoginEffects]),
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
