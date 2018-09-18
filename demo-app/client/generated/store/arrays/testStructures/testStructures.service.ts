/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {ArraysService} from '../../../controllers/Arrays';

@Injectable()
export class TestStructuresFormService {
  form: FormGroup;
  constructor(
    private arraysService: ArraysService,
  ) {
    this.form = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
      arraySection: new FormGroup({
        arrayObjectRef: new FormArrayExtended(() => (
          new FormGroup({
            id: new FormControl(undefined, [Validators.required]),
            name: new FormControl(undefined, []),
          }, [])), []),
        arrayStringInline: new FormArrayExtended(() => (
          new FormControl(undefined, [])), []),
        arrayArrayStringsRef: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new FormControl(undefined, [])), [])), []),
        arrayArrayObjectRef: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new FormGroup({
              id: new FormControl(undefined, [Validators.required]),
              name: new FormControl(undefined, []),
            }, [])), [])), []),
      }, [Validators.required]),
    });
  }

  submit() {
    return this.arraysService.testStructures(this.form.value);
  }
}
