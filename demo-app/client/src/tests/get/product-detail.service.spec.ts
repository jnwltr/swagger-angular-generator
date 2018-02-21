import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { ProductDetailService } from '../../../generated/controllers/ProductDetail';

describe(`ProductDetailService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ProductDetailService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(

      inject([ProductDetailService, HttpTestingController],
        (service: ProductDetailService, backend: HttpTestingController) => {

          service.productDetail({ productId: 1 }).subscribe();

          backend.expectOne((req: HttpRequest<any>) => {
            return req.method === 'GET'
              && req.url.endsWith('/api/product-detail/1');
          });
        }),
    ),
  );

});
