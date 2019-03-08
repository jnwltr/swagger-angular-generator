import {HttpTestingController} from '@angular/common/http/testing';
import {cloneDeep} from 'lodash';

import {safeSetValue} from '../../../generated/common/utils';
import {MapParams, StructuresService} from '../../../generated/controllers/Structures';
import {MapFormService} from '../../../generated/store/structures/map/map.service';
import {initHttpBed} from '../common';

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
  let service: MapFormService;
  let backend: HttpTestingController;

  beforeEach(() => {
    ({service, backend} = initHttpBed<MapFormService>(MapFormService, [StructuresService]));
  });

  afterEach(() => {
    backend.verify();
  });

  it(`should set and send structured value properly`, () => {
    service.form.setValue(formDataMock);

    expect(service.form.value !== formDataMock).toBeTruthy('Form object does not differ from mock object');
    expect(service.form.value).toEqual(formDataMock, 'Form value differs from mock value');

    service.submit().subscribe();

    const req = backend.expectOne('/api-base-path/structures/map').request;
    expect(req.body).toEqual(formDataMock.mapSection);
  });

  it(`should add and remove keys properly`, () => {
    service.form.setValue(formDataMock);
    expect(service.form.value).toEqual(formDataMock, 'Form value differs from mock value');

    // modify data
    const formDataMockModified = cloneDeep(formDataMock);
    formDataMockModified.mapSection.key3 = formDataMockModified.mapSection.key1;
    delete formDataMockModified.mapSection.key1;

    service.form.setValue(formDataMockModified);

    expect(service.form.value !== formDataMockModified).toBeTruthy('Form object does not differ from mock object');
    expect(service.form.value).toEqual(formDataMockModified, 'Form value differs from modified mock value');
  });

  it(`should clear objects properly`, () => {
    service.form.setValue(formDataMock);
    expect(service.form.value).toEqual(formDataMock, 'Form value differs from mock value');

    // clear data
    safeSetValue(service.form, null);
    expect(service.form.value).toEqual(emptyDataMock, 'Form value is empty');
  });

  it(`should throw error on non-object value`, () => {
    const arrayForm = service.form.get('mapSection');
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
  });
});
