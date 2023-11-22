/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {TicketingService} from '../../../controllers/Ticketing';

@Injectable()
export class ShowTicketDetailFormService {
  form: UntypedFormGroup;
  constructor(
    private ticketingService: TicketingService,
  ) {
    this.form = new UntypedFormGroup({
      date_from: new UntypedFormControl(undefined, []),
      date_to: new UntypedFormControl(undefined, []),
      id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.ticketingService.showTicketDetail(data);
  }
}
