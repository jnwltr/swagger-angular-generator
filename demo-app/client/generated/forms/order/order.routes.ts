/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Routes} from '@angular/router';
import {OrderComponent} from './order.component';

export const routes: Routes = [
  {path: '', component: OrderComponent, pathMatch: 'full'},
];
