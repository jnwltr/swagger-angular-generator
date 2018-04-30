/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../../../controllers/Products';

@Injectable()
export class ProductsFormService {
  form: FormGroup;
  constructor(
    private productsService: ProductsService,
  ) {
    this.form = new FormGroup({
      stringField: new FormControl(undefined, []),
      BooleanField: new FormControl(undefined, []),
      int32Field: new FormControl(undefined, []),
      longField: new FormControl(undefined, []),
      floatField: new FormControl(undefined, []),
      doubleField: new FormControl(undefined, []),
      byteField: new FormControl(undefined, []),
      binaryField: new FormControl(undefined, []),
      dateField: new FormControl(undefined, []),
      dateTimeField: new FormControl(undefined, []),
    });
  }

  submit() {
    return this.productsService.products(this.form.value);
  }
}
