/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {RestAuthLogoutCreateComponent} from './RestAuthLogoutCreate.component';
import {FormsSharedModule} from '../../forms-shared.module';
import {RestAuthService} from '../../../controllers/RestAuth';
import {RestAuthLogoutCreateEffects} from './states/effects';
import {RestAuthLogoutCreateReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('RestAuthLogoutCreate', RestAuthLogoutCreateReducer),
    EffectsModule.forFeature([RestAuthLogoutCreateEffects]),
  ],
  declarations: [
    RestAuthLogoutCreateComponent,
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthLogoutCreateModule {
}
