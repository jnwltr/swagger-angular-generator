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
export class OrderFormService {
  form: FormGroup;
  constructor(
    private orderService: OrderService,
  ) {
    this.form = new FormGroup({
      orderDto: new FormGroup({
        id: new FormControl(undefined, [Validators.required]),
        name: new FormControl(undefined, []),
      }, []),
      producer: new FormControl(undefined, []),
    });
  }

  submit() {
    return this.orderService.order(this.form.value);
  }
}
