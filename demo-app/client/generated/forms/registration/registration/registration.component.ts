/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../../controllers/Registration';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
})

export class RegistrationComponent implements OnInit {
  RegistrationForm: FormGroup;
  email = new FormControl('', [Validators.email, Validators.required]);
  password1 = new FormControl('', [Validators.required]);
  password2 = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
  ) {}

  ngOnInit() {
    this.RegistrationForm = this.formBuilder.group({
      email: this.email,
      password1: this.password1,
      password2: this.password2,
    }, {updateOn: 'change'});
  }

  registration() {
    this.registrationService.registration(this.RegistrationForm.value);
  }
}
