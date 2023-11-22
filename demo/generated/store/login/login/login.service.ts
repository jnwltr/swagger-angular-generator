/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../controllers/Login';

@Injectable()
export class LoginFormService {
  form: UntypedFormGroup;
  constructor(
    private loginService: LoginService,
  ) {
    this.form = new UntypedFormGroup({
      loginDto: new UntypedFormGroup({
        email: new UntypedFormControl(undefined, [Validators.email, Validators.required]),
        password: new UntypedFormControl(undefined, [Validators.required]),
      }, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.loginService.login(data);
  }
}
