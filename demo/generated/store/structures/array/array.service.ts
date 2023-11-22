/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {StructuresService} from '../../../controllers/Structures';

@Injectable()
export class ArrayFormService {
  form: UntypedFormGroup;
  constructor(
    private structuresService: StructuresService,
  ) {
    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      arraySection: new UntypedFormGroup({
        arrayObjectRef: new FormArrayExtended(() => (
          new UntypedFormGroup({
            id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
            name: new UntypedFormControl(undefined, []),
          }, [Validators.required])), [], [Validators.required]),
        arrayStringInline: new FormArrayExtended(() => (
          new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required]),
        arrayArrayStringsRef: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required])), [], [Validators.required]),
        arrayArrayObjectRef: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new UntypedFormGroup({
              id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
              name: new UntypedFormControl(undefined, []),
            }, [Validators.required])), [], [Validators.required])), [], [Validators.required]),
        nestedArray: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required])), [], [Validators.required]),
        nestedRefsArray: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new FormArrayExtended(() => (
              new UntypedFormGroup({
                id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
                name: new UntypedFormControl(undefined, []),
              }, [Validators.required])), [], [Validators.required])), [], [Validators.required])), [], [Validators.required]),
      }, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.structuresService.array(data);
  }
}
