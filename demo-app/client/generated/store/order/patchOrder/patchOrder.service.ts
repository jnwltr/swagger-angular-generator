/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../controllers/Order';

@Injectable()
export class PatchOrderFormService {
  form: FormGroup;
  constructor(
    private orderService: OrderService,
  ) {
    this.form = new FormGroup({
      orderId: new FormControl(undefined, [Validators.required]),
      producer: new FormControl(undefined, []),
      model: new FormControl(undefined, []),
    });
  }

  submit() {
    return this.orderService.patchOrder(this.form.value);
  }
}
