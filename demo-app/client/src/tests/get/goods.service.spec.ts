import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {GoodsService} from '../../../generated/controllers/Goods';

describe(`GoodsService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [GoodsService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(

      inject([GoodsService, HttpTestingController],
        (service: GoodsService, backend: HttpTestingController) => {

        service.getGoodsList({}).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          return req.method === 'GET'
            && req.url === '/api-base-path/goods/get-goods-list/';
        });
      }),
    ),
  );

});
