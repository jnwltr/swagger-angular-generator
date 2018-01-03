import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {DeleteOrderService} from '../../generated/controllers/DeleteOrder';
import {OrderService} from '../../generated/controllers/Order';
import {PatchOrderService} from '../../generated/controllers/PatchOrder';
import {ProductDetailService} from '../../generated/controllers/ProductDetail';
import {ProductsService} from '../../generated/controllers/Products';
import {PutOrderService} from '../../generated/controllers/PutOrder';

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(''),
    EffectsModule.forRoot([]),
    HttpClientModule,
  ],
  providers: [
    DeleteOrderService,
    OrderService,
    PatchOrderService,
    ProductDetailService,
    ProductsService,
    PutOrderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
