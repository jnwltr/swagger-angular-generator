import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DeleteOrderService } from '../../generated/controllers/DeleteOrder';
import { OrderService } from '../../generated/controllers/Order';
import { PatchOrderService } from '../../generated/controllers/PatchOrder';
import { ProductDetailService } from '../../generated/controllers/ProductDetail';
import { ProductsService } from '../../generated/controllers/Products';
import { PutOrderService } from '../../generated/controllers/PutOrder';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
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
