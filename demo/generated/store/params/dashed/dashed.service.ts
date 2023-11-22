/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {ParamsService} from '../../../controllers/Params';

@Injectable()
export class DashedFormService {
  form: UntypedFormGroup;
  constructor(
    private paramsService: ParamsService,
  ) {
    this.form = new UntypedFormGroup({
      pathParam: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      'dashed-path-param': new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      queryParam: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      queryParamCollectionDefault: new FormArrayExtended(() => (
        new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required]),
      queryParamCollectionCsv: new FormArrayExtended(() => (
        new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required]),
      queryParamCollectionSsv: new FormArrayExtended(() => (
        new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required]),
      queryParamCollectionMulti: new FormArrayExtended(() => (
        new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required]),
      'dashed-query-param': new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      'dashed-query-param-collection-tsv': new FormArrayExtended(() => (
        new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required]),
      'dashed-query-param-collection-pipes': new FormArrayExtended(() => (
        new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required]),
      'dashed-query-param-collection-multi': new FormArrayExtended(() => (
        new UntypedFormControl(undefined, [Validators.required])), [], [Validators.required]),
      headerParam: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      'dashed-header-param': new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      bodyParam: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
      'dashed-body-param': new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/), Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.paramsService.dashed(data);
  }
}
