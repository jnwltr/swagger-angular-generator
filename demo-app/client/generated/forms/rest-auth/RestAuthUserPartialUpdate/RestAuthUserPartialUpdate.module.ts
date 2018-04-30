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
import {RestAuthUserPartialUpdateComponent} from './restAuthUserPartialUpdate.component';
import {RestAuthUserPartialUpdateEffects} from './states/effects';
import {RestAuthUserPartialUpdateReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
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
