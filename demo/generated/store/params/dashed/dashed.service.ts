/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {ParamsService} from '../../../controllers/Params';

@Injectable()
export class DashedFormService {
  form: FormGroup;
  constructor(
    private paramsService: ParamsService,
  ) {
    this.form = new FormGroup({
      pathParam: new FormControl(undefined, [Validators.required]),
      'dashed-path-param': new FormControl(undefined, [Validators.required]),
      queryParam: new FormControl(undefined, [Validators.required]),
      queryParamCollectionDefault: new FormArrayExtended(() => (
        new FormControl(undefined, [Validators.required])), [], [Validators.required]),
      queryParamCollectionCsv: new FormArrayExtended(() => (
        new FormControl(undefined, [Validators.required])), [], [Validators.required]),
      queryParamCollectionSsv: new FormArrayExtended(() => (
        new FormControl(undefined, [Validators.required])), [], [Validators.required]),
      queryParamCollectionMulti: new FormArrayExtended(() => (
        new FormControl(undefined, [Validators.required])), [], [Validators.required]),
      'dashed-query-param': new FormControl(undefined, [Validators.required]),
      'dashed-query-param-collection-tsv': new FormArrayExtended(() => (
        new FormControl(undefined, [Validators.required])), [], [Validators.required]),
      'dashed-query-param-collection-pipes': new FormArrayExtended(() => (
        new FormControl(undefined, [Validators.required])), [], [Validators.required]),
      'dashed-query-param-collection-multi': new FormArrayExtended(() => (
        new FormControl(undefined, [Validators.required])), [], [Validators.required]),
      headerParam: new FormControl(undefined, [Validators.required]),
      'dashed-header-param': new FormControl(undefined, [Validators.required]),
      bodyParam: new FormControl(undefined, [Validators.required]),
      'dashed-body-param': new FormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.paramsService.dashed(data);
  }
}
