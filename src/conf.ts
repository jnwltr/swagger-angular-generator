/** Configuration constants */
import {MethodName, NativeNames, ParamLocation} from './types';

// relative to project root
export const outDir = '../esslg2/frontend/frontend/src/api/config-server';
export const commonDir = 'common';
export const defsDir = 'defs';
export const apiDir = 'controllers';
export const storeDir = 'store';
export const stateDir = 'states';
export const apiFile = '../esslg2/frontend/frontend/src/api/config-server.json';
export const modelFile = 'model';
export const indentation = 2;
export const swaggerUrlPath = '/swagger';
export const apiUrlPrefix = '';
export const omitVersion = false;
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

// list of parameter types accepted by methods
// ordered as they are passed to api service methods
// The 'parameters: []' type is only technical and serves for situations when common parameters are defined
// on the same level as HTTP methods
export const allowedParams: {[key in MethodName]: ParamLocation[]} = {
  get: ['path', 'query', 'header'],
  patch: ['path', 'body', 'query', 'formData', 'header'],
  post: ['path', 'body', 'query', 'formData', 'header'],
  put: ['path', 'body', 'query', 'header'],
  delete: ['path', 'header'],
};
// list of simplified names of controllers
// that do not to generate api layer
export const controllerIgnores = ['BackOffice'];
// tag of ignored methods
// that do not to generate api layer
export const methodIgnoredByTag = 'internal-use-only';
// implemented only for api
// once other one is needed, make it file-based
export const adHocExceptions: {[key: string]: {[key: string]: [RegExp, string]}} = {
  api: {
    Help: [/^  itemNumbers\?: ref;$/m, '  itemNumbers?: number[]'],
  },
};
