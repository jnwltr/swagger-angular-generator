/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {RestAuthUserPartialUpdateComponent} from './RestAuthUserPartialUpdate.component';
import {FormsSharedModule} from '../../forms-shared.module';
import {RestAuthService} from '../../../controllers/RestAuth';
import {RestAuthUserPartialUpdateEffects} from './states/effects';
import {RestAuthUserPartialUpdateReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('RestAuthUserPartialUpdate', RestAuthUserPartialUpdateReducer),
    EffectsModule.forFeature([RestAuthUserPartialUpdateEffects]),
  ],
  declarations: [
    RestAuthUserPartialUpdateComponent,
  ],
  providers: [
    RestAuthService,
  ],
})
export class RestAuthUserPartialUpdateModule {
}
