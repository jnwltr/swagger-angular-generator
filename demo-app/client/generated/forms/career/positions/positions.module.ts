/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../../forms-shared.module';
import {CareerService} from '../../../controllers/Career';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadCareerPositionsReducer} from './states/reducers';
import {LoadCareerPositionsEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    StoreModule.forFeature('LoadCareerPositions', LoadCareerPositionsReducer),
    EffectsModule.forFeature([LoadCareerPositionsEffects]),
  ],
  declarations: [
  ],
  providers: [
    CareerService,
  ],
})
export class CareerPositionsModule {
}
