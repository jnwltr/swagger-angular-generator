/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../controllers/Login';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  email = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    }, {updateOn: 'change'});
  }

  login() {
    this.loginService.login(this.LoginForm.value);
  }
}
