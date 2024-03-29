/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
      int32Field: new FormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      longField: new FormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      floatField: new FormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      doubleField: new FormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      byteField: new FormControl(undefined, []),
      binaryField: new FormControl(undefined, []),
      dateField: new FormControl(undefined, []),
      dateTimeField: new FormControl(undefined, []),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.productsService.products(data);
  }
}
