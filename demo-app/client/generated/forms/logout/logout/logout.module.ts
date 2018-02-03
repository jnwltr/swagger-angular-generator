/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './logout.routes';
import {LogoutLogoutComponent} from './logout.component';
import {LogoutService} from '../../../controllers/Logout';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CreateLogoutLogoutReducer} from './states/reducers';
import {CreateLogoutLogoutEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('CreateLogoutLogout', CreateLogoutLogoutReducer),
    EffectsModule.forFeature([CreateLogoutLogoutEffects]),
  ],
  declarations: [
    LogoutLogoutComponent,
  ],
  providers: [
    LogoutService,
  ],
})
export class LogoutLogoutModule {
}
