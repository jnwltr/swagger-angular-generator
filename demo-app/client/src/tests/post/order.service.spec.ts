import {HttpTestingController} from '@angular/common/http/testing';

import {OrderService} from '../../../generated/controllers/Order';
import {initHttpBed} from '../common';

describe(`OrderService`, () => {
  let service: OrderService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<OrderService>(OrderService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    const bodyParam = {id: 15, name: 'example order'};
    service.order({orderDto: bodyParam, producer: 'test-producer'}).subscribe();

    const req = backend.expectOne(r => r.url === '/api-base-path/order').request;
    expect(req.method).toBe('POST');
    expect(req.params.get('producer')).toBe('test-producer');
    expect(req.body).toEqual(bodyParam);
  });

  it(`should check missing single optional body param works and produces empty body object {}`, () => {
    service.order({}).subscribe();

    const req = backend.expectOne('/api-base-path/order').request;
    expect(req.method).toBe('POST');
    expect(req.params.toString()).toBe('');
    expect(req.body).toEqual({});
  });
});
