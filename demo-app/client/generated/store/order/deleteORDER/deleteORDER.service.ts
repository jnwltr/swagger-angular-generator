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
export class DeleteORDERFormService {
  orderForm: FormGroup;
  constructor(
    private orderService: OrderService,
  ) {
    this.orderForm = new FormGroup({
      orderId: new FormControl(undefined, [Validators.required]),
    });
  }

  order() {
    this.orderService.deleteORDER(this.orderForm.value);
  }
}
