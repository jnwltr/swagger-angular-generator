/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {FormsSharedModule} from '../../forms-shared.module';
import {RestAuthService} from '../../../controllers/RestAuth';
import {RestAuthLogoutListEffects} from './states/effects';
import {RestAuthLogoutListReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('RestAuthLogoutList', RestAuthLogoutListReducer),
    EffectsModule.forFeature([RestAuthLogoutListEffects]),
  ],
  declarations: [
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthLogoutListModule {
}
