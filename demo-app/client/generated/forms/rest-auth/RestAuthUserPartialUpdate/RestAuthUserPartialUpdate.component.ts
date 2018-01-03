/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestAuthService} from '../../../controllers/RestAuth';

@Component({
  selector: 'restAuthUserPartialUpdate',
  templateUrl: './restAuthUserPartialUpdate.component.html',
})

export class RestAuthUserPartialUpdateComponent implements OnInit {
  RestAuthForm: FormGroup;
  data = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private restauthService: RestAuthService,
  ) {}

  ngOnInit() {
    this.RestAuthForm = this.formBuilder.group({
      data: this.data,
    }, {updateOn: 'change'});
  }

  restauth() {
    this.restauthService.restAuthUserPartialUpdate(this.RestAuthForm.value);
  }
}
