/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LogoutComponent} from './logout.component';
import {FormsSharedModule} from '../../forms-shared.module';
import {LogoutService} from '../../../controllers/Logout';
import {LogoutEffects} from './states/effects';
import {LogoutReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('Logout', LogoutReducer),
    EffectsModule.forFeature([LogoutEffects]),
  ],
  declarations: [
    LogoutComponent,
  ],
  providers: [
    LogoutService,
  ],
})
export class LogoutModule {
}
