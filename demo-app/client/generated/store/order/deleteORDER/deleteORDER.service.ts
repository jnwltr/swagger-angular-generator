/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '|shared/forms';
import {OrderService} from '../../../controllers/Order';

@Injectable()
export class DeleteORDERFormService {
  form: FormGroup;
  constructor(
    private orderService: OrderService,
  ) {
    this.form = new FormGroup({
      orderId: new FormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.orderService.deleteORDER(data);
  }
}
