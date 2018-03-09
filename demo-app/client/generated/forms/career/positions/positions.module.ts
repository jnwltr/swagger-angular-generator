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
import {CareerService} from '../../../controllers/Career';
import {PositionsEffects} from './states/effects';
import {PositionsReducer} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('Positions', PositionsReducer),
    EffectsModule.forFeature([PositionsEffects]),
  ],
  declarations: [
  ],
  providers: [
    CareerService,
  ],
})
export class PositionsModule {
}
