/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../controllers/Login';

@Injectable()
export class LoginFormService {
  form: FormGroup;
  constructor(
    private loginService: LoginService,
  ) {
    this.form = new FormGroup({
      loginDto: new FormGroup({
        email: new FormControl(undefined, [Validators.email, Validators.required]),
        password: new FormControl(undefined, [Validators.required]),
      }, [Validators.required]),
    });
  }

  submit() {
    return this.loginService.login(this.form.value);
  }
}
