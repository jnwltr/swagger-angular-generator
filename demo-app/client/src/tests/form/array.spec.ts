import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {isEqual} from 'lodash';
import {ArraysService, TestStructuresParams} from '../../../generated/controllers/Arrays';
import {TestStructuresFormService} from '../../../generated/store/arrays/testStructures/testStructures.service';

const objectArray = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Doe'},
  {id: 3, name: 'Foo'},
];
const stringArray = ['one', 'two', 'three'];
const formDataMock: TestStructuresParams = {
  id: 10,
  arraySection: {
    arrayObjectRef: [...objectArray],
    arrayStringInline: [...stringArray],
    arrayArrayStringsRef: [[...stringArray], [...stringArray].reverse()],
    arrayArrayObjectRef: [[...objectArray].reverse(), [...objectArray]],
  },
};

describe(`Array form`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        TestStructuresFormService,
        ArraysService,
      ],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should set and send structured value properly`, async(inject([TestStructuresFormService, HttpTestingController],
    (formService: TestStructuresFormService, backend: HttpTestingController) => {
      formService.form.setValue(formDataMock);

      expect(formService.form.value !== formDataMock).toBeTruthy('Form object does not differ from mock object');
      expect(formService.form.value).toEqual(formDataMock, 'Form value differs from mock value');

      formService.submit().subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        return isEqual(req.body, formDataMock.arraySection) &&
               req.params.get('id') === formDataMock.id.toString();
      });
  })));
});
