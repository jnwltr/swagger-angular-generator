/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../controllers/Login';

@Injectable()
export class LoginFormService {
  loginForm: FormGroup;
  constructor(
    private loginService: LoginService,
  ) {
    this.loginForm = new FormGroup({
      loginDto: new FormGroup({
        email: new FormControl(undefined, [Validators.email, Validators.required]),
        password: new FormControl(undefined, [Validators.required]),
      }, [Validators.required]),
    });
  }

  login() {
    this.loginService.login(this.loginForm.value);
  }
}
