/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductDetailService} from '../../../controllers/ProductDetail';

@Injectable()
export class ProductDetailFormService {
  productDetailForm: FormGroup;
  constructor(
    private productDetailService: ProductDetailService,
  ) {
    this.productDetailForm = new FormGroup({
      productId: new FormControl(undefined, [Validators.required]),
    });
  }

  productDetail() {
    this.productDetailService.productDetail(this.productDetailForm.value);
  }
}
