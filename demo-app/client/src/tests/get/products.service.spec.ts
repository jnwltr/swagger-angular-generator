import {HttpTestingController} from '@angular/common/http/testing';

import {ProductsParams, ProductsService} from '../../../generated/controllers/Products';
import {initHttpBed} from '../common';

describe(`ProductsService`, () => {
  let service: ProductsService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<ProductsService>(ProductsService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check service makes request as expected`, () => {
    const params: ProductsParams = {
      stringField: 'example-producer',
      int32Field: 10,
      BooleanField: true,
      longField: 100000,
      floatField: 10,
      doubleField: 10,
      dateField: '2017-04-12',
      dateTimeField: '2017-04-12T23:20:50.52Z',
    };

    service.products(params).subscribe();

    const req = backend.expectOne(r => r.url === '/api-base-path/products').request;
    expect(req.method).toBe('GET');
    expect(req.body).toBe(null);

    Object.entries(params).forEach(([k, v]) => expect(req.params.get(k)).toBe(v.toString()));
  });
});
