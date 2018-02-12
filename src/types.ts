/** Shared types */
export type MethodName = 'get' | 'patch' | 'post' | 'put' | 'delete';
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

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameterObject
export interface Parameter {
  description: string;
  in: string;
  name: string;
  required: boolean;
  enum?: string[];
  items?: Schema;
  schema?: Schema;
  type?: string;
  format?: string;
  allowEmptyValue?: boolean;
  default?: any;
  maximum?: number;
  minimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  uniqueItems?: boolean;
}

export interface Schema {
  type?: string;
  $ref?: string;
  enum?: string[];
  additionalProperties?: Schema;
  items?: Schema;
  description?: string;
  example?: any;
  format?: string;
  allowEmptyValue?: boolean;
  default?: any;
  maximum?: number;
  minimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  uniqueItems?: boolean;
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
