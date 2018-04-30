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
  selector: 'restAuthLogoutCreate',
  templateUrl: './restAuthLogoutCreate.component.html',
})

export class RestAuthLogoutCreateComponent implements OnInit {
  RestAuthForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private restauthService: RestAuthService,
  ) {}

  ngOnInit() {
    this.RestAuthForm = this.formBuilder.group({
    }, {updateOn: 'change'});
  }

  restauth() {
    this.restauthService.restAuthLogoutCreate();
  }
}
