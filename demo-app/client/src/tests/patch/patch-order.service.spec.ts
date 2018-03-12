import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {OrderService} from '../../../generated/controllers/Order';

describe(`Order patch`, () => {
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
          service.patchOrder({
            orderId: '100',
            model: 'test-model',
            },
          ).subscribe();

          backend.expectOne((req: HttpRequest<any>) => {
            return req.method === 'PATCH'
              && req.url === '/api/order/100'
              && req.body.model === 'test-model'
              && JSON.stringify(Object.keys(req.body)) === JSON.stringify(['model']);
          });
        }),
    ),
  );
});
