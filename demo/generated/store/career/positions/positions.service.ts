/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CareerService} from '../../../controllers/Career';

@Injectable()
export class PositionsFormService {
  form: UntypedFormGroup;
  constructor(
    private careerService: CareerService,
  ) {
    this.form = new UntypedFormGroup({
      positionId: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      version: new UntypedFormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.careerService.positions(data);
  }
}
