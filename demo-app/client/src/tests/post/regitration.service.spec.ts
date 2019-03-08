import {HttpTestingController} from '@angular/common/http/testing';

import {RegistrationParams, RegistrationService} from '../../../generated/controllers/Registration';
import {initHttpBed} from '../common';

describe(`LoginService`, () => {
  let service: RegistrationService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<RegistrationService>(RegistrationService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    const params: RegistrationParams = {
      registrationType: 'admin',
      email: 'test@test.com',
      password1: 'password1',
      password2: 'password2',
      selfRefParam: {
        prop1: 'property1',
        parent: {
          prop1: 'property1',
        },
      },
    };
    service.registration(params).subscribe();

    const req = backend.expectOne('/api-base-path/registration/admin').request;
    expect(req.method).toBe('POST');
    const bodyParams = {...params};
    delete bodyParams.registrationType;
    expect(req.body).toEqual(bodyParams);
  });
});
