/* tslint:disable:max-line-length no-empty-interface */
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
import {Ticketing_show-ticket-detail_readFormService} from './ticketing_show-ticket-detail_read.service';

import {Ticketing_show-ticket-detail_readEffects} from './states/effects';
import {Ticketing_show-ticket-detail_readReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, Ticketing_show-ticket-detail_readReducer),
    NgrxEffectsModule.forFeature([Ticketing_show-ticket-detail_readEffects]),
  ],
  providers: [
    TicketingService,
    Ticketing_show-ticket-detail_readFormService,
  ],
})
export class Ticketing_show-ticket-detail_readModule {}
