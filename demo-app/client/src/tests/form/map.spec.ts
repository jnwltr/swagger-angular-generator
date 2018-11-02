import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {cloneDeep} from 'lodash';

import {safeSetValue} from '../../../generated/common/utils';
import {MapParams, StructuresService} from '../../../generated/controllers/Structures';
import {MapFormService} from '../../../generated/store/structures/map/map.service';

const objectArray = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Doe'},
  {id: 3, name: 'Foo'},
];
const formDataMock: MapParams = {
  mapSection: {
    key1: {
      control: 1,
      group: objectArray[0],
      arrayOfObjects: objectArray,
      mapRef: {a1: 101, b1: 202, c1: 303},
      mapInlinePrimitive: {a2: 1001, b2: 2002, c2: 3003},
      mapInlineRef: {a3: objectArray[1], b3: objectArray[2]},
      arrayOfMaps: [{a4: 100001, b4: 200002}, {a4: 100001, c4: 300003}, {b4: 200002, c4: 300003}],
    },
    key2: {
      control: 2,
      group: objectArray[1],
      arrayOfObjects: [...objectArray],
      mapRef: {a1: 101, b1: 202, c1: 303},
      mapInlinePrimitive: {a2: 1001, b2: 2002, c2: 3003},
      mapInlineRef: {a3: objectArray[1], b3: objectArray[2]},
      arrayOfMaps: [{a4: 100001, b4: 200002}, {a4: 100001, c4: 300003}, {b4: 200002, c4: 300003}],
    },
  },
};
const emptyDataMock: MapParams = {mapSection: {}};

describe(`Map form`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        MapFormService,
        StructuresService,
      ],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should set and send structured value properly`, async(inject([MapFormService, HttpTestingController],
    (formService: MapFormService, backend: HttpTestingController) => {
      formService.form.setValue(formDataMock);

      expect(formService.form.value !== formDataMock).toBeTruthy('Form object does not differ from mock object');
      expect(formService.form.value).toEqual(formDataMock, 'Form value differs from mock value');

      formService.submit().subscribe();

      const req = backend.expectOne('/api-base-path/structures/map').request;
      expect(req.body).toEqual(formDataMock.mapSection);
    },
  )));

  it(`should add and remove keys properly`, async(inject([MapFormService], (formService: MapFormService) => {
    formService.form.setValue(formDataMock);
    expect(formService.form.value).toEqual(formDataMock, 'Form value differs from mock value');

    // modify data
    const formDataMockModified = cloneDeep(formDataMock);
    formDataMockModified.mapSection.key3 = formDataMockModified.mapSection.key1;
    delete formDataMockModified.mapSection.key1;

    formService.form.setValue(formDataMockModified);

    expect(formService.form.value !== formDataMockModified).toBeTruthy('Form object does not differ from mock object');
    expect(formService.form.value).toEqual(formDataMockModified, 'Form value differs from modified mock value');
  })));

  it(`should clear objects properly`, async(inject([MapFormService], (formService: MapFormService) => {
    formService.form.setValue(formDataMock);
    expect(formService.form.value).toEqual(formDataMock, 'Form value differs from mock value');

    // clear data
    safeSetValue(formService.form, null);
    expect(formService.form.value).toEqual(emptyDataMock, 'Form value is empty');
  })));

  it(`should throw error on non-object value`, async(inject([MapFormService], (formService: MapFormService) => {
    const arrayForm = formService.form.get('mapSection');
    if (!arrayForm) throw new Error('Subform not found');

    expect(() => safeSetValue(arrayForm, undefined)).not.toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, null)).not.toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, {})).not.toThrowError(TypeError);

    expect(() => safeSetValue(arrayForm, [])).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, '')).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, 'string')).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, 0)).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, 1)).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, NaN)).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, true)).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, false)).toThrowError(TypeError);
  })));
});
