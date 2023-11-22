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
export class OrderFormService {
  form: UntypedFormGroup;
  constructor(
    private orderService: OrderService,
  ) {
    this.form = new UntypedFormGroup({
      orderDto: new UntypedFormGroup({
        id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
        name: new UntypedFormControl(undefined, []),
      }, []),
      producer: new UntypedFormControl(undefined, []),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.orderService.order(data);
  }
}
