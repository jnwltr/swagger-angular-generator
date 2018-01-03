/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedModule} from '../forms-shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './career.routes';
import {CareerComponent} from './career.component';
import {CareerService} from '../../controllers/Career';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LoadCareerPositionsReducer} from './states/reducers';
import {LoadCareerPositionsEffects} from './states/effects';

@NgModule({
  imports: [
    FormsSharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('LoadCareerPositions', LoadCareerPositionsReducer),
    EffectsModule.forFeature([LoadCareerPositionsEffects]),
  ],
  declarations: [
    CareerComponent,
  ],
  providers: [
    CareerService,
  ],
})
export class CareerModule {
}
