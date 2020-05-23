/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '|shared/forms';
import {GoodsService} from '../../../controllers/Goods';

@Injectable()
export class Goods_get-goods-list_listFormService {
  form: FormGroup;
  constructor(
    private goodsService: GoodsService,
  ) {
    this.form = new FormGroup({
      limit: new FormControl(undefined, []),
      offset: new FormControl(undefined, []),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.goodsService.goods_get-goods-list_list(data);
  }
}
