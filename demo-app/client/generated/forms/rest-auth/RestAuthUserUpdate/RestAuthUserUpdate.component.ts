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
  selector: 'RestAuthUserUpdate',
  templateUrl: './RestAuthUserUpdate.component.html',
})

export class RestAuthRestAuthUserUpdateComponent implements OnInit {
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
    this.restauthService.RestAuthUserUpdate(this.RestAuthForm.value);
  }
}
