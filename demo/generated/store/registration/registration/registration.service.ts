/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../../controllers/Registration';

@Injectable()
export class RegistrationFormService {
  form: UntypedFormGroup;
  constructor(
    private registrationService: RegistrationService,
  ) {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl(undefined, [Validators.email, Validators.required]),
      password1: new UntypedFormControl(undefined, [Validators.required]),
      password2: new UntypedFormControl(undefined, [Validators.required]),
      selfRefParam: new UntypedFormGroup({
        prop1: new UntypedFormControl(undefined, []),
      }, [Validators.required]),
      registrationType: new UntypedFormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.registrationService.registration(data);
  }
}
