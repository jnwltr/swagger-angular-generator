/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Routes} from '@angular/router';
import {ProductDetailComponent} from './product-detail.component';

export const routes: Routes = [
  {path: '', component: ProductDetailComponent, pathMatch: 'full'},
];
