import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {OrderService} from '../../generated/controllers/Order';
import {ProductDetailService} from '../../generated/controllers/ProductDetail';
import {ProductsService} from '../../generated/controllers/Products';

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
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
  ],
  providers: [
    OrderService,
    ProductDetailService,
    ProductsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
