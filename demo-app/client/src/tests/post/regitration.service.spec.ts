import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {RegistrationService} from '../../../generated/controllers/Registration';

describe(`LoginService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [RegistrationService],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should check request parameters are correct`,
    async(

      inject([RegistrationService, HttpTestingController],
        (service: RegistrationService, backend: HttpTestingController) => {

        service.registration({registrationType: 'admin',
                                    email: 'test@test.com',
                                    password1: 'password1',
                                    password2: 'password2',
                                    selfRefParam: {
                                        prop1: 'property1'
                                    }}).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          return req.method === 'POST'
            && req.url === '/api/registration/admin'
            && req.body.email === 'test@test.com'
            && req.body.password1 === 'password1'
            && req.body.password2 === 'password2';
        });
      }),
    ),
  );

});
