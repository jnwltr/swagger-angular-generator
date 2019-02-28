import {HttpTestingController} from '@angular/common/http/testing';
import {LogoutService} from '../../../generated/controllers/Logout';
import {initHttpBed} from '../common';

describe(`OrderService`, () => {
  let service: LogoutService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<LogoutService>(LogoutService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    service.logout().subscribe();
    const req = backend.expectOne('/api-base-path/logout').request;
    expect(req.method).toBe('POST');
    expect(req.body).toEqual({});
  });
});
