import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';

import {DashedParams, ParamsService} from '../../../generated/controllers/Params';
import {DashedFormService} from '../../../generated/store/params/dashed/dashed.service';

const mock: DashedParams = {
  pathParam: 101,
  queryParam: 202,
  headerParam: 303,
  bodyParam: 404,
  'dashed-path-param': 1001,
  'dashed-query-param': 2002,
  'dashed-header-param': 3003,
  'dashed-body-param': 4004,
};

describe(`Param call`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        ParamsService,
        DashedFormService,
      ],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should set and send dashed params properly`, async(inject([DashedFormService, HttpTestingController],
    (formService: DashedFormService, backend: HttpTestingController) => {
      formService.form.setValue(mock);

      expect(formService.form.value !== mock).toBeTruthy('Form object does not differ from mock object');
      expect(formService.form.value).toEqual(mock, 'Form value differs from mock value');

      formService.submit().subscribe();

      const requestTest = backend.expectOne(
        `/api-base-path/params/normal/${mock.pathParam}/dashed/${mock['dashed-path-param']}` +
        `?queryParam=${mock.queryParam}&dashed-query-param=${mock['dashed-query-param']}`);
      const req = requestTest.request;

      expect(Number(req.headers.get('headerParam'))).toBe(mock.headerParam);
      expect(Number(req.headers.get('dashed-header-param'))).toBe(mock['dashed-header-param']);

      expect(req.body).toEqual({
        bodyParam: mock.bodyParam,
        'dashed-body-param': mock['dashed-body-param'],
      });
  })));
});
