import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { OrderService } from '../../../generated/controllers/Order';

describe(`OrderService`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [OrderService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(
      inject([OrderService, HttpTestingController],
        (service: OrderService, backend: HttpTestingController) => {

          const bodyParam = { id: 15, name: 'example order' };
          service.order({ orderDto: bodyParam, producer: 'test-producer' }).subscribe();
          backend.expectOne((req: HttpRequest<any>) => {
            expect(req.method).toEqual('POST');
            expect(req.url).toBe('http://example.com/api/order');
            expect(req.params.toString()).toEqual('producer=test-producer');
            expect(req.body).toEqual(bodyParam);

            return true;
          });
        }),
    ),
  );

  it(`should check missing single optional body param works and produces empty body object {}`,
    async(
      inject([OrderService, HttpTestingController],
        (service: OrderService, backend: HttpTestingController) => {

          service.order({}).subscribe();
          backend.expectOne((req: HttpRequest<any>) => {
            expect(req.method).toEqual('POST');
            expect(req.url.endsWith('/api/order')).toBeTruthy();
            expect(req.params.toString()).toEqual('');
            expect(req.body).toEqual({});

            return true;
          });
        }),
    ),
  );
});
