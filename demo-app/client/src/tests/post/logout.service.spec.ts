import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { LogoutService } from '../../../generated/controllers/Logout';

describe(`OrderService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [LogoutService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(

      inject([LogoutService, HttpTestingController],
        (service: LogoutService, backend: HttpTestingController) => {

          service.logout().subscribe();

          backend.expectOne((req: HttpRequest<any>) => {
            return req.method === 'POST'
              && req.url === 'http://example.com/api/logout'
              && JSON.stringify(req.body) === '{}';
          });
        }),
    ),
  );

});
