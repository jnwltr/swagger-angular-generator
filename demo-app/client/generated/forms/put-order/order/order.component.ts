/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PutOrderService} from '../../../controllers/PutOrder';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
})

export class PutOrderOrderComponent implements OnInit {
  PutOrderForm: FormGroup;
  producer = new FormControl('', [Validators.required]);
  model = new FormControl('', [Validators.required]);
  customerName = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private putorderService: PutOrderService,
  ) {}

  ngOnInit() {
    this.PutOrderForm = this.formBuilder.group({
      producer: this.producer,
      model: this.model,
      customerName: this.customerName,
    }, {updateOn: 'change'});
  }

  putorder() {
    this.putorderService.order(this.PutOrderForm.value);
  }
}
