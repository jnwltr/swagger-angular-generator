import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {cloneDeep} from 'lodash';

import {safeSetValue} from '../../../generated/common/utils';
import {ArrayParams, StructuresService} from '../../../generated/controllers/Structures';
import {ArrayStructure} from '../../../generated/model';
import {ArrayFormService} from '../../../generated/store/structures/array/array.service';

const objectArray = [
  {id: 1, name: 'One'},
  {id: 2, name: 'Two'},
  {id: 3, name: 'Three'},
];
const stringArray = ['one', 'two', 'three'];
const formDataMock: ArrayParams = {
  id: 10,
  arraySection: {
    arrayObjectRef: objectArray,
    arrayStringInline: stringArray,
    arrayArrayStringsRef: [[...stringArray], [...stringArray].reverse()],
    arrayArrayObjectRef: [[...objectArray].reverse(), [...objectArray]],
    nestedArray: [[...stringArray]],
    nestedRefsArray: [[[...objectArray]]],
  },
};

const emptyDataMock: ArrayStructure = {
  arrayObjectRef: [],
  arrayStringInline: [],
  arrayArrayStringsRef: [],
  arrayArrayObjectRef: [],
  nestedArray: [],
  nestedRefsArray: [],
};

describe(`Array form`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        ArrayFormService,
        StructuresService,
      ],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should set and send structured value properly`, async(inject([ArrayFormService, HttpTestingController],
    (formService: ArrayFormService, backend: HttpTestingController) => {
      formService.form.setValue(formDataMock);

      expect(formService.form.value !== formDataMock).toBeTruthy('Form object does not differ from mock object');
      expect(formService.form.value).toEqual(formDataMock, 'Form value differs from mock value');

      formService.submit().subscribe();

      const req = backend.expectOne(`/api-base-path/structures/array?id=${formDataMock.id}`).request;
      expect(req.body).toEqual(formDataMock.arraySection);
      expect(req.params.get('id')).toBe(formDataMock.id.toString());
  })));

  it(`should add, remove and modify items properly`, async(inject([ArrayFormService],
    (formService: ArrayFormService) => {
      formService.form.setValue(formDataMock);

      // modify data
      const formDataMockModified = cloneDeep(formDataMock);
      formDataMockModified.arraySection.arrayObjectRef[0].name = 'Modified';
      formDataMockModified.arraySection.arrayArrayStringsRef[0][0] = 'modified';
      formDataMockModified.arraySection.arrayObjectRef.pop();
      formDataMockModified.arraySection.arrayArrayStringsRef[0].pop();
      formDataMockModified.arraySection.arrayObjectRef.push({id: 4, name: 'New'});
      formDataMockModified.arraySection.arrayArrayStringsRef[0].push('new');

      formDataMockModified.arraySection.arrayStringInline.pop();
      formDataMockModified.arraySection.arrayArrayObjectRef.push([{id: 0, name: 'Zero'}]);

      formService.form.setValue(formDataMockModified);
      expect(formService.form.value !== formDataMockModified)
        .toBeTruthy('Form object does not differ from mock object');
      expect(formService.form.value).toEqual(formDataMockModified, 'Form value differs from modified mock value');
    },
  )));

  it(`should clear items properly`, async(inject([ArrayFormService], (formService: ArrayFormService) => {
    formService.form.setValue(formDataMock);

    // clear data
    safeSetValue(formService.form, null);
    expect(formService.form.value.arraySection).toEqual(emptyDataMock, 'Form value array is empty');
  })));

  it(`should throw error on non-array value`, async(inject([ArrayFormService], (formService: ArrayFormService) => {
    const arrayForm = formService.form.get('arraySection.arrayObjectRef');
    if (!arrayForm) throw new Error('Subform not found');

    expect(() => safeSetValue(arrayForm, undefined)).not.toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, null)).not.toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, [])).not.toThrowError(TypeError);

    expect(() => safeSetValue(arrayForm, {})).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, '')).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, 'string')).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, 0)).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, 1)).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, NaN)).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, true)).toThrowError(TypeError);
    expect(() => safeSetValue(arrayForm, false)).toThrowError(TypeError);
  })));
});
