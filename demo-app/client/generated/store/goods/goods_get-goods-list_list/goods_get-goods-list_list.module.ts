/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {GoodsService} from '../../../controllers/Goods';
import {FormsSharedModule} from '../../forms-shared.module';
import {Goods_get-goods-list_listFormService} from './goods_get-goods-list_list.service';

import {Goods_get-goods-list_listEffects} from './states/effects';
import {Goods_get-goods-list_listReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, Goods_get-goods-list_listReducer),
    NgrxEffectsModule.forFeature([Goods_get-goods-list_listEffects]),
  ],
  providers: [
    GoodsService,
    Goods_get-goods-list_listFormService,
  ],
})
export class Goods_get-goods-list_listModule {}
