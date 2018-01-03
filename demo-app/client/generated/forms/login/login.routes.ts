/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Routes} from '@angular/router';
import {LoginComponent} from './login.component';

export const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
];
