/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../../controllers/Registration';

@Injectable()
export class RegistrationFormService {
  form: FormGroup;
  constructor(
    private registrationService: RegistrationService,
  ) {
    this.form = new FormGroup({
      email: new FormControl(undefined, [Validators.email, Validators.required]),
      password1: new FormControl(undefined, [Validators.required]),
      password2: new FormControl(undefined, [Validators.required]),
      selfRefParam: new FormGroup({
        prop1: new FormControl(undefined, []),
      }, [Validators.required]),
      registrationType: new FormControl(undefined, [Validators.required]),
    });
  }

  submit() {
    return this.registrationService.registration(this.form.value);
  }
}
