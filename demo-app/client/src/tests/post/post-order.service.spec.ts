import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {OrderService} from '../../../generated/controllers/Order';

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

        service.order({orderDto: {id: 15, name: 'example order'}, producer: 'test-producer'}).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          return req.method === 'POST'
            && req.url === '/api/order'
            && req.body.id === 15
            && req.body.name === 'example order'
            && req.params.toString() === 'producer=test-producer';
        });
      }),
    ),
  );

});
