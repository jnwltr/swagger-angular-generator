import {HttpTestingController} from '@angular/common/http/testing';

import {DashedParams, ParamsService} from '../../../generated/controllers/Params';
import {DashedFormService} from '../../../generated/store/params/dashed/dashed.service';
import {initHttpBed} from '../common';

const mock: DashedParams = {
  pathParam: 101,
  queryParam: 202,
  queryParamCollectionDefault: ['d', 'e', 'f'],
  queryParamCollectionCsv: ['c', 's', 'v'],
  queryParamCollectionSsv: [1, 2],
  queryParamCollectionMulti: [3, 4],
  headerParam: 303,
  bodyParam: 404,
  'dashed-path-param': 1001,
  'dashed-query-param': 2002,
  'dashed-query-param-collection-tsv': ['t', 's', 'v'],
  'dashed-query-param-collection-pipes': [5, 6],
  'dashed-query-param-collection-multi': ['m', 'u', 'l'],
  'dashed-header-param': 3003,
  'dashed-body-param': 4004,
};

describe(`Param call`, () => {
  let service: DashedFormService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<DashedFormService>(DashedFormService, [ParamsService]));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should set and send dashed params properly`, () => {
    service.form.setValue(mock);

    expect(service.form.value !== mock).toBeTruthy('Form object does not differ from mock object');
    expect(service.form.value).toEqual(mock, 'Form value differs from mock value');

    service.submit().subscribe();

    const requestTest = backend.expectOne(r =>
      r.url === `/api-base-path/params/normal/${mock.pathParam}/dashed/${mock['dashed-path-param']}`);
    const req = requestTest.request;

    expect(req.params.get('queryParam')).toEqual(mock.queryParam.toString());
    expect(req.params.get('queryParamCollectionDefault')).toEqual(mock.queryParamCollectionDefault.join(','));
    expect(req.params.get('queryParamCollectionCsv')).toEqual(mock.queryParamCollectionCsv.join(','));
    expect(req.params.get('queryParamCollectionSsv')).toEqual(mock.queryParamCollectionSsv.join(' '));
    // `number[]` stored that way - not cast to `string[]`
    expect(req.params.getAll('queryParamCollectionMulti') as any[])
      .toEqual(mock.queryParamCollectionMulti as any[]);

    expect(req.params.get('dashed-query-param')).toEqual(mock['dashed-query-param'].toString());
    expect(req.params.get('dashed-query-param-collection-tsv'))
      .toEqual(mock['dashed-query-param-collection-tsv'].join('\t'));
    expect(req.params.get('dashed-query-param-collection-pipes'))
      .toEqual(mock['dashed-query-param-collection-pipes'].join('|'));
    expect(req.params.getAll('dashed-query-param-collection-multi'))
      .toEqual(mock['dashed-query-param-collection-multi']);

    expect(Number(req.headers.get('headerParam'))).toBe(mock.headerParam);
    expect(Number(req.headers.get('dashed-header-param'))).toBe(mock['dashed-header-param']);

    expect(req.body).toEqual({
      bodyParam: mock.bodyParam,
      'dashed-body-param': mock['dashed-body-param'],
    });
  });

  it(`should set and send empty arrays properly`, () => {
    const mockOverride = {...mock};
    mockOverride.queryParamCollectionDefault = [];
    mockOverride['dashed-query-param-collection-tsv'] = [];
    mockOverride.queryParamCollectionMulti = [];
    mockOverride['dashed-query-param-collection-multi'] = [];

    service.form.setValue(mockOverride);
    service.submit().subscribe();

    const requestTest = backend.expectOne(r =>
      r.url === `/api-base-path/params/normal/${mockOverride.pathParam}/dashed/${mockOverride['dashed-path-param']}`);
    const req = requestTest.request;

    expect(req.params.get('queryParamCollectionDefault')).toBe('');
    expect(req.params.get('dashed-query-param-collection-tsv')).toBe('');
    // `number[]` stored that way - not cast to `string[]`
    expect(req.params.getAll('queryParamCollectionMulti')).toEqual(null);
    expect(req.params.getAll('dashed-query-param-collection-multi')).toEqual(null);
  });
});
