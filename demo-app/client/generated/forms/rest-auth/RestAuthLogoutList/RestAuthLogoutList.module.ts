/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {RestAuthService} from '../../../controllers/RestAuth';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadRestAuthRestAuthLogoutListReducer} from './states/reducers';
import {LoadRestAuthRestAuthLogoutListEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('LoadRestAuthRestAuthLogoutList', LoadRestAuthRestAuthLogoutListReducer),
    EffectsModule.forFeature([LoadRestAuthRestAuthLogoutListEffects]),
  ],
  declarations: [
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthRestAuthLogoutListModule {
}
