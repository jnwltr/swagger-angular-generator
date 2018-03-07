import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { CareerService } from '../../../generated/controllers/Career';
import { BASE_URL } from '../../../generated/model';
describe(`CareerDetailService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: BASE_URL, useValue: 'http://here.com' }, CareerService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct when BASE_URL are provided`,
    async(
      inject([CareerService, HttpTestingController],
        (service: CareerService, backend: HttpTestingController) => {

          service.positions({ version: '2', positionId: 220 }).subscribe();

          backend.expectOne((req: HttpRequest<any>) => {
            return req.method === 'GET'
              && req.url === 'http://here.com/api/career/v2/positions/220';
          });
        }),
    ),
  );

});
