import {HttpTestingController} from '@angular/common/http/testing';

import {CareerService} from '../../../generated/controllers/Career';
import {initHttpBed} from '../common';

describe(`CareerDetailService`, () => {
  let service: CareerService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<CareerService>(CareerService));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should check request parameters are correct`, () => {
    service.positions({version: '2', positionId: 220}).subscribe();
    const req = backend.expectOne('/api-base-path/career/v2/positions/220').request;
    expect(req.method).toBe('GET');
  });
});
