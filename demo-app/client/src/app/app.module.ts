import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {DeleteOrderService} from '../../generated/controllers/DeleteOrder';
import {OrderService} from '../../generated/controllers/Order';
import {PatchOrderService} from '../../generated/controllers/PatchOrder';
import {ProductDetailService} from '../../generated/controllers/ProductDetail';
import {ProductsService} from '../../generated/controllers/Products';
import {PutOrderService} from '../../generated/controllers/PutOrder';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CommonModule} from '@angular/common';
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
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
    }) : [],
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
export class AppModule { }
