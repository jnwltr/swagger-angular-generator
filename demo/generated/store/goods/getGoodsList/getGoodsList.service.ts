/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {GoodsService} from '../../../controllers/Goods';

@Injectable()
export class GetGoodsListFormService {
  form: UntypedFormGroup;
  constructor(
    private goodsService: GoodsService,
  ) {
    this.form = new UntypedFormGroup({
      limit: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
      offset: new UntypedFormControl(undefined, [Validators.pattern(/^([+-]?[1-9]\d*|0)$/)]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.goodsService.getGoodsList(data);
  }
}
