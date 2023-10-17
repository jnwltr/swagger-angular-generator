/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {TicketingService} from '../../../controllers/Ticketing';
import {FormsSharedModule} from '../../forms-shared.module';
import {ShowTicketDetailFormService} from './showTicketDetail.service';

import {ShowTicketDetailEffects} from './states/effects';
import {ShowTicketDetailReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, ShowTicketDetailReducer),
    NgrxEffectsModule.forFeature([ShowTicketDetailEffects]),
  ],
  providers: [
    TicketingService,
    ShowTicketDetailFormService,
  ],
})
export class ShowTicketDetailModule {}
