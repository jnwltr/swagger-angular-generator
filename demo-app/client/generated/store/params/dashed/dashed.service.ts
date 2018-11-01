/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ParamsService} from '../../../controllers/Params';

@Injectable()
export class DashedFormService {
  form: FormGroup;
  constructor(
    private paramsService: ParamsService,
  ) {
    this.form = new FormGroup({
      pathParam: new FormControl(undefined, [Validators.required]),
      'dashed-path-param': new FormControl(undefined, [Validators.required]),
      queryParam: new FormControl(undefined, [Validators.required]),
      'dashed-query-param': new FormControl(undefined, [Validators.required]),
      headerParam: new FormControl(undefined, [Validators.required]),
      'dashed-header-param': new FormControl(undefined, [Validators.required]),
      bodyParam: new FormControl(undefined, [Validators.required]),
      'dashed-body-param': new FormControl(undefined, [Validators.required]),
    });
  }

  submit() {
    return this.paramsService.dashed(this.form.value);
  }
}
