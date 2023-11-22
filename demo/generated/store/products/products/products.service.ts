/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../controllers/Products';

@Injectable()
export class ProductsFormService {
  form: UntypedFormGroup;
  constructor(
    private productsService: ProductsService,
  ) {
    this.form = new UntypedFormGroup({
      stringField: new UntypedFormControl(undefined, []),
      BooleanField: new UntypedFormControl(undefined, []),
      int32Field: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      longField: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      floatField: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      doubleField: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      byteField: new UntypedFormControl(undefined, []),
      binaryField: new UntypedFormControl(undefined, []),
      dateField: new UntypedFormControl(undefined, []),
      dateTimeField: new UntypedFormControl(undefined, []),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.productsService.products(data);
  }
}
