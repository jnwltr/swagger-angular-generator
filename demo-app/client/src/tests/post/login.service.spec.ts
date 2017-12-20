import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {LoginService} from '../../../generated/controllers/Login';

describe(`LoginService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [LoginService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(

      inject([LoginService, HttpTestingController],
        (service: LoginService, backend: HttpTestingController) => {

        service.login({loginDto: {email: 'test@test.com', password: 'password'}}).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          return req.method === 'POST'
            && req.url === '/api/login'
            && req.body.loginDto.email === 'test@test.com'
            && req.body.loginDto.password === 'password';
        });
      }),
    ),
  );

});
