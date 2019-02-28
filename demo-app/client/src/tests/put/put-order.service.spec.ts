import {HttpTestingController} from '@angular/common/http/testing';

import {OrderService, PutOrderParams} from '../../../generated/controllers/Order';
import {initHttpBed} from '../common';

describe(`Order put`, () => {
  let service: OrderService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<OrderService>(OrderService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    const params: PutOrderParams = {
      orderId: '100',
      producer: 'test-producer',
      model: 'test-model',
      customerName: 'Johnny Cash',
    };
    service.putOrder(params).subscribe();

    const req = backend.expectOne('/api-base-path/order/100').request;
    expect(req.method).toBe('PUT');
    const bodyParams = {...params};
    delete bodyParams.orderId;
    expect(req.body).toEqual(bodyParams);
  });
});
