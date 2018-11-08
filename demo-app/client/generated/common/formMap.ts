import {AbstractControl, FormGroup} from '@angular/forms';
import {ControlFactory} from './utils';

/** Extends FormGroup so it contains definition of map items for further creation */
export class FormMap extends FormGroup {
  constructor(public createControl: ControlFactory, controls: Record<string, AbstractControl>, ...rest: any[]) {
    super(controls, ...rest);
  }

  setValue(value: Record<string, any>, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this.setShape(Object.keys(value));
    super.setValue(value, options);
  }

  /**
   * Sets child controls for a specified list of keys
   * @param keys list of keys new form group should contain
   */
  setShape(keys: string[]) {
    const allKeys = new Set([...keys, ...Object.keys(this.controls)]);
    allKeys.forEach(key => {
      // add control for a new one
      if (!(key in this.controls)) this.addControl(key, this.createControl());
      // remove control if missing
      else if (!keys.includes(key)) this.removeControl(key);
    });
  }
}
