/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CareerService} from '../../../controllers/Career';

@Injectable()
export class PositionsFormService {
  careerForm: FormGroup;
  constructor(
    private careerService: CareerService,
  ) {
    this.careerForm = new FormGroup({
      positionId: new FormControl(undefined, [Validators.required]),
      version: new FormControl(undefined, [Validators.required]),
    });
  }

  career() {
    this.careerService.positions(this.careerForm.value);
  }
}
