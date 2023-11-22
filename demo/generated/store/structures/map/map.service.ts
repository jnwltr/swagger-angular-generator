/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {FormMap} from '../../../common/formMap';
import {StructuresService} from '../../../controllers/Structures';

@Injectable()
export class MapFormService {
  form: UntypedFormGroup;
  constructor(
    private structuresService: StructuresService,
  ) {
    this.form = new UntypedFormGroup({
      mapSection: new FormMap(() => (
        new UntypedFormGroup({
          control: new UntypedFormControl(undefined, []),
          group: new UntypedFormGroup({
            id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
            name: new UntypedFormControl(undefined, []),
          }, []),
          arrayOfObjects: new FormArrayExtended(() => (
            new UntypedFormGroup({
              id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
              name: new UntypedFormControl(undefined, []),
            }, [])), [], []),
          mapRef: new FormMap(() => (
            new UntypedFormControl(undefined, [])), {}, []),
          mapInlinePrimitive: new FormMap(() => (
            new UntypedFormControl(undefined, [])), {}, []),
          mapInlineRef: new FormMap(() => (
            new UntypedFormGroup({
              id: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
              name: new UntypedFormControl(undefined, []),
            }, [])), {}, []),
          arrayOfMaps: new FormArrayExtended(() => (
            new FormMap(() => (
              new UntypedFormControl(undefined, [])), {}, [])), [], []),
        }, [Validators.required])), {}, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.structuresService.map(data);
  }
}
