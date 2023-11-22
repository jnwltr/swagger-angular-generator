/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ProductDetailService} from '../../../controllers/ProductDetail';

@Injectable()
export class ProductDetailFormService {
  form: UntypedFormGroup;
  constructor(
    private productDetailService: ProductDetailService,
  ) {
    this.form = new UntypedFormGroup({
      productId: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.productDetailService.productDetail(data);
  }
}
