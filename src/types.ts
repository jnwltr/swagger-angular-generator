/** Shared types */
/* The 'parameters' MethodName type is only technical and serves for situations when common parameters are defined
* on the same level as HTTP methods */
export type MethodName = 'get' | 'patch' | 'post' | 'put' | 'delete';
export type ParamLocation = 'path' | 'body' | 'query' | 'formData' | 'header';
export type HttpCode = '200' | '201' | '204' |
  '400' | '401' | '403' | '404' | '409' | '417' |
  '500';

export interface Method {
  tags: [string];
  summary: string;
  operationId: string;
  description: string;
  parameters: Parameter[];
  responses: HttpResponse;
}

export type HttpResponse = {
  [key in HttpCode]?: Response;
};

interface ParameterSchemaBase {
  allowEmptyValue?: boolean;
  default?: any;
  description?: string;
  enum?: string[] | number[];
  format?: string;
  items?: Schema;
  maximum?: number;
  maxLength?: number;
  minimum?: number;
  minLength?: number;
  pattern?: string;
  type?: string;
  uniqueItems?: boolean;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameterObject
export interface Parameter extends ParameterSchemaBase {
  description: string;
  in: ParamLocation;
  name: string;
  required: boolean;
  schema?: Schema;
  collectionFormat?: QueryCollectionFormat;
}

export type QueryCollectionFormat = 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';

export interface Schema extends ParameterSchemaBase {
  $ref?: string;
  additionalProperties?: Schema;
  example?: any;
  readOnly?: boolean;
  required?: string[];
  type?: string;
  properties?: {
    [key: string]: Schema;
  };
}

export interface Response {
  description?: string;
  schema?: Schema;
}

export type NativeNames =
  'binary' | 'boolean' | 'byte' | 'date' | 'dateTime' | 'double' |
  'file' | 'float' | 'integer' | 'long' | 'number' | 'object' |
  'password' | 'string';

export type FileType = 'ts' | 'html' | 'scss';
