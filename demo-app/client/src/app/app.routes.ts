import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login',
  loadChildren: '../../generated/forms/login/login/login.module#LoginLoginModule'},
];
