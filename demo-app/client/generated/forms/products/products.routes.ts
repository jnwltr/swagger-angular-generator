/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Routes} from '@angular/router';
import {ProductsComponent} from './products.component';

export const routes: Routes = [
  {path: '', component: ProductsComponent, pathMatch: 'full'},
];
