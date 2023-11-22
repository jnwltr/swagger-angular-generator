/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {RestAuthService} from '../../../controllers/RestAuth';

@Injectable()
export class RestAuthUserUpdateFormService {
  form: UntypedFormGroup;
  constructor(
    private restAuthService: RestAuthService,
  ) {
    this.form = new UntypedFormGroup({
      data: new UntypedFormGroup({
        pk: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
        username: new UntypedFormControl(undefined, [Validators.maxLength(150), Validators.pattern(/^[\w.@+-]+$/), Validators.required]),
        email: new UntypedFormControl(undefined, [Validators.email]),
        first_name: new UntypedFormControl(undefined, [Validators.maxLength(30)]),
        last_name: new UntypedFormControl(undefined, [Validators.maxLength(150)]),
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
