import {HttpTestingController} from '@angular/common/http/testing';
import {OrderService} from '../../../generated/controllers/Order';
import {initHttpBed} from '../common';

describe(`Order delete`, () => {
  let service: OrderService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<OrderService>(OrderService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    service.deleteORDER({orderId: '123e4567-e89b-12d3-a456-426655440000'}).subscribe();

    const req = backend.expectOne('/api-base-path/order/123e4567-e89b-12d3-a456-426655440000').request;
    expect(req.method).toBe('DELETE');
  });

  it(`generate single parameter unwrapped method`, () => {
    service.deleteORDER_('123e4567-e89b-12d3-a456-426655440000').subscribe();

    const req = backend.expectOne('/api-base-path/order/123e4567-e89b-12d3-a456-426655440000').request;
    expect(req.method).toBe('DELETE');
  });
});
