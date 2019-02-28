import {HttpTestingController} from '@angular/common/http/testing';

import {LoginService} from '../../../generated/controllers/Login';
import {initHttpBed} from '../common';

describe(`LoginService`, () => {
  let service: LoginService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<LoginService>(LoginService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    service.login({loginDto: {email: 'test@test.com', password: 'password'}}).subscribe();

    const req = backend.expectOne('/api-base-path/login').request;
    expect(req.method).toBe('POST');
    expect(req.body.loginDto.email).toBe('test@test.com');
    expect(req.body.loginDto.password).toBe('password');
  });
});
