/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {RestAuthService} from '../../../controllers/RestAuth';
import {FormsSharedModule} from '../../forms-shared.module';
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
