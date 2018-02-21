import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { DeleteOrderService } from '../../../generated/controllers/DeleteOrder';
describe(`DeleteOrderService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [DeleteOrderService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(

      inject([DeleteOrderService, HttpTestingController],
        (service: DeleteOrderService, backend: HttpTestingController) => {

          service.order({ orderId: '123e4567-e89b-12d3-a456-426655440000' }).subscribe();

          backend.expectOne((req: HttpRequest<any>) => {
            return req.method === 'DELETE'
              &&
              req.url === 'http://example.com/api/order/123e4567-e89b-12d3-a456-426655440000';
          });
        }),
    ),
  );

});
