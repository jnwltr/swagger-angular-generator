/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CareerService} from '../../../controllers/Career';

@Injectable()
export class PositionsFormService {
  form: FormGroup;
  constructor(
    private careerService: CareerService,
  ) {
    this.form = new FormGroup({
      positionId: new FormControl(undefined, [Validators.required]),
      version: new FormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.careerService.positions(data);
  }
}
