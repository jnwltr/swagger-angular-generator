import {HttpTestingController} from '@angular/common/http/testing';
import {GoodsService} from '../../../generated/controllers/Goods';
import {initHttpBed} from '../common';

describe(`GoodsService`, () => {
  let service: GoodsService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<GoodsService>(GoodsService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    service.getGoodsList({}).subscribe();
    const req = backend.expectOne('/api-base-path/goods/get-goods-list/').request;
    expect(req.method).toBe('GET');
  });
});
