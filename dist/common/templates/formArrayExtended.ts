import {AbstractControl, FormArray} from '@angular/forms';
import {ControlFactory} from './utils';

/** Extends FormArray so it contains definition of items for further creation */
export class FormArrayExtended extends FormArray {
  constructor(public createControl: ControlFactory, controls: AbstractControl[], ...rest: any[]) {
    super(controls, ...rest);
  }

  setValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this.setSize(value.length);
    super.setValue(value, options);
  }

  /**
   * Sets specified number of controls in the array
   * @param size of the array
   */
  setSize(size: number) {
    while (size < this.controls.length) this.removeAt(0);
    while (size > this.controls.length) this.push(this.createControl());
  }
}
