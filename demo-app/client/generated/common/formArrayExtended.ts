/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {AbstractControl, FormArray} from '@angular/forms';

type ControlFactory = () => AbstractControl;

/** Extends FormArray so it contains definitions of items for further creation */
export class FormArrayExtended extends FormArray {
  constructor(public createControl: ControlFactory, ...rest: any[]) {
    super([], ...rest);
  }

  setValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    while (value.length < this.controls.length) this.removeAt(this.length - 1);
    while (value.length > this.controls.length) this.push(this.createControl());
    super.setValue(value, options);
  }
}
