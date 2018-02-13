import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {ProductsService} from '../../../generated/controllers/Products';

describe(`ProductsService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ProductsService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check service makes request as expected`,
    async(

      inject([ProductsService, HttpTestingController],
        (service: ProductsService, backend: HttpTestingController) => {

        service.products({
          stringField: 'example-producer',
          int32Field: 10,
          BooleanField: true,
          longField: 100000,
          floatField: 10,
          doubleField: 10,
          dateField: '2017-04-12',
          dateTimeField: '2017-04-12T23:20:50.52Z',
        }).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          return req.method === 'GET'
            && req.url === '/api/products'
            && req.params.toString() === 'stringField=example-producer' +
                                         '&BooleanField=true' +
                                         '&int32Field=10' +
                                         '&longField=100000' +
                                         '&floatField=10' +
                                         '&doubleField=10' +
                                         '&dateField=2017-04-12' +
                                         '&dateTimeField=2017-04-12T23:20:50.52Z'
            && req.body === null;
        });
      }),
    ),
  );

});
