import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {PutOrderService} from '../../../generated/controllers/PutOrder';

describe(`PutOrderService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [PutOrderService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(

      inject([PutOrderService, HttpTestingController],
        (service: PutOrderService, backend: HttpTestingController) => {

        service.order({
          orderId: '100',
          producer: 'test-producer',
          model: 'test-model',
          customerName: 'Johny Cash'},
        ).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          return req.method === 'PUT'
            && req.url === '/api/order/100'
            && req.body.producer === 'test-producer'
            && req.body.model === 'test-model'
            && req.body.customerName === 'Johny Cash';
        });
      }),
    ),
  );

});
