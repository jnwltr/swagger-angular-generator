/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PatchOrderService} from '../../../controllers/PatchOrder';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
})

export class PatchOrderOrderComponent implements OnInit {
  PatchOrderForm: FormGroup;
  producer = new FormControl('', []);
  model = new FormControl('', []);

  constructor(
    private formBuilder: FormBuilder,
    private patchorderService: PatchOrderService,
  ) {}

  ngOnInit() {
    this.PatchOrderForm = this.formBuilder.group({
      producer: this.producer,
      model: this.model,
    }, {updateOn: 'change'});
  }

  patchorder() {
    this.patchorderService.order(this.PatchOrderForm.value);
  }
}
