/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GoodsService} from '../../../controllers/Goods';

@Injectable()
export class GetGoodsListFormService {
  form: FormGroup;
  constructor(
    private goodsService: GoodsService,
  ) {
    this.form = new FormGroup({
      limit: new FormControl(undefined, []),
      offset: new FormControl(undefined, []),
    });
  }

  submit() {
    return this.goodsService.getGoodsList(this.form.value);
  }
}
