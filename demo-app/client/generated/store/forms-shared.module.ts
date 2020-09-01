/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IczFormsModule} from '|shared/forms';

@NgModule({
  imports: [
    CommonModule,
    IczFormsModule,
  ],
  exports: [
    CommonModule,
    IczFormsModule,
  ],
})
export class FormsSharedModule {}
