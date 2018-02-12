/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../controllers/Order';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
})

export class OrderOrderComponent implements OnInit {
  OrderForm: FormGroup;
  id = new FormControl('', [Validators.required]);
  name = new FormControl('', []);

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.OrderForm = this.formBuilder.group({
      id: this.id,
      name: this.name,
    }, {updateOn: 'change'});
  }

  order() {
    this.orderService.order(this.OrderForm.value);
  }
}
