/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestAuthService} from '../../../controllers/RestAuth';

@Injectable()
export class RestAuthUserUpdateFormService {
  form: FormGroup;
  constructor(
    private restAuthService: RestAuthService,
  ) {
    this.form = new FormGroup({
      data: new FormGroup({
        pk: new FormControl(undefined, []),
        username: new FormControl(undefined, [Validators.maxLength(150), Validators.pattern(/^[\w.@+-]+$/), Validators.required]),
        email: new FormControl(undefined, [Validators.email]),
        first_name: new FormControl(undefined, [Validators.maxLength(30)]),
        last_name: new FormControl(undefined, [Validators.maxLength(150)]),
      }, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.restAuthService.restAuthUserUpdate(data);
  }
}
