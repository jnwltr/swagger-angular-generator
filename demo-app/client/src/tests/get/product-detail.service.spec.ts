import {HttpTestingController} from '@angular/common/http/testing';
import {ProductDetailService} from '../../../generated/controllers/ProductDetail';
import {initHttpBed} from '../common';

describe(`ProductDetailService`, () => {
  let service: ProductDetailService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<ProductDetailService>(ProductDetailService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    service.productDetail({productId: 1}).subscribe();
    const req = backend.expectOne('/api-base-path/product-detail/1').request;
    expect(req.method).toBe('GET');
    });
});
