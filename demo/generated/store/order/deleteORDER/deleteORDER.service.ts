/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../controllers/Order';

@Injectable()
export class DeleteORDERFormService {
  form: UntypedFormGroup;
  constructor(
    private orderService: OrderService,
  ) {
    this.form = new UntypedFormGroup({
      orderId: new UntypedFormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.orderService.deleteORDER(data);
  }
}
