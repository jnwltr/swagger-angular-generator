/** Configuration constants */
import {MethodName, NativeNames} from './types';

// relative to project root
export const outDir = 'src/api';
export const defsDir = 'defs';
export const apiDir = 'controllers';
export const storeDir = 'store';
export const stateDir = 'states';
export const apiFile = 'conf/api/api-docs.json';
export const modelFile = 'model';
export const indentation = 2;
// part of path in url
export const swaggerFile = '/swagger-ui.html#!/';

// mapping from swagger native types to javascript types
export const nativeTypes: {[key in NativeNames]: string} = {
  binary: 'number',
  boolean: 'boolean',
  byte: 'number',
  date: 'string',
  dateTime: 'string',
  double: 'number',
  file: 'File',
  float: 'number',
  integer: 'number',
  long: 'number',
  number: 'number',
  object: 'object',
  password: 'string',
  string: 'string',
};

/* list of parameter types accepted by methods
* ordered as they are passed to api service methods
* The 'parameters: []' type is only technical and serves for situations when common parameters are defined
* on the same level as HTTP methods */
export const allowedParams: {[key in MethodName]: string[]} = {
  get: ['path', 'query'],
  patch: ['path', 'body', 'query', 'formData'],
  post: ['path', 'body', 'query', 'formData'],
  put: ['path', 'body', 'query'],
  delete: ['path'],
};
// list of simplified names of controllers
// that do not to generate api layer
export const controllerIgnores = ['BackOffice'];
// implemented only for api
// once other one is needed, make it file-based
export const adHocExceptions: { [key: string]: { [key: string]: [RegExp, string] } } = {
  api: {
    Help: [/^  itemNumbers\?: ref;$/m, '  itemNumbers?: number[]'],
  },
};
