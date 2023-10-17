/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {OrderService} from '../../../controllers/Order';
import {FormsSharedModule} from '../../forms-shared.module';
import {DeleteORDERFormService} from './deleteORDER.service';

import {DeleteORDEREffects} from './states/effects';
import {DeleteORDERReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, DeleteORDERReducer),
    NgrxEffectsModule.forFeature([DeleteORDEREffects]),
  ],
  providers: [
    OrderService,
    DeleteORDERFormService,
  ],
})
export class DeleteORDERModule {}
