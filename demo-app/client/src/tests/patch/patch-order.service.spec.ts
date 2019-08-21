import {HttpTestingController} from '@angular/common/http/testing';

import {OrderService} from '../../../generated/controllers/Order';
import {initHttpBed} from '../common';

describe(`Order patch`, () => {
  let service: OrderService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<OrderService>(OrderService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    service.patchOrder({orderId: '100', model: 'test-model'}).subscribe();

    const req = backend.expectOne('/api-base-path/order/100').request;
    expect(req.method).toBe('PATCH');
    expect(JSON.parse(JSON.stringify(req.body)))
      .toEqual({model: 'test-model'});
  });
});
