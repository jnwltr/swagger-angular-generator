import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {CareerService} from '../../../generated/controllers/Career';

describe(`CareerDetailService`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [CareerService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(
      inject([CareerService, HttpTestingController],
        (service: CareerService, backend: HttpTestingController) => {
          service.positions({version: '2', positionId: 220}).subscribe();
          backend.expectOne((req: HttpRequest<any>) => {
            return req.method === 'GET'
              && req.url === '/api-base-path/career/v2/positions/220';
          });
      }),
    ),
  );
});
