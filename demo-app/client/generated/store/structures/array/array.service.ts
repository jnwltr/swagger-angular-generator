/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {StructuresService} from '../../../controllers/Structures';

@Injectable()
export class ArrayFormService {
  form: FormGroup;
  constructor(
    private structuresService: StructuresService,
  ) {
    this.form = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
      arraySection: new FormGroup({
        arrayObjectRef: new FormArrayExtended(() => (
          new FormGroup({
            id: new FormControl(undefined, [Validators.required]),
            name: new FormControl(undefined, []),
          }, [Validators.required])), [], [Validators.required]),
        arrayStringInline: new FormArrayExtended(() => (
          new FormControl(undefined, [Validators.required])), [], [Validators.required]),
        arrayArrayStringsRef: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new FormControl(undefined, [Validators.required])), [], [Validators.required])), [], [Validators.required]),
        arrayArrayObjectRef: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new FormGroup({
              id: new FormControl(undefined, [Validators.required]),
              name: new FormControl(undefined, []),
            }, [Validators.required])), [], [Validators.required])), [], [Validators.required]),
        nestedArray: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new FormControl(undefined, [])), [], [])), [], []),
        nestedRefsArray: new FormArrayExtended(() => (
          new FormArrayExtended(() => (
            new FormArrayExtended(() => (
              new FormGroup({
                id: new FormControl(undefined, [Validators.required]),
                name: new FormControl(undefined, []),
              }, [])), [], [])), [], [])), [], []),
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
