import {HttpResponse, Method, MethodName, Parameter} from '../types';

export interface Paths {
  [key: string]: {
    [key in MethodName]?: Method;
  };
}

export type MethodOrParameters =
  {[key in MethodName]?: Method} &
  {parameters: Parameter[]};

export interface PathsWithParameters {
  [key: string]: MethodOrParameters;
}

export interface Dictionary<T> {
  [index: string]: T;
}

export interface ResponseDef {
  type: string;
  enumDeclaration: string;
  usesGlobalType: boolean;
}

export interface ControllerMethod {
  summary: string;
  operationId: string;
  description: string;
  methodName: MethodName;
  simpleName: string;
  name: string;
  url: string;
  swaggerUrl: string;
  responses: HttpResponse;
  responseDef: ResponseDef;
  paramDef: Parameter[];
  basePath: string;
}

export interface MethodOutput {
  methodDef: string;
  interfaceDef: string;
  usesGlobalType: boolean;
  paramGroups: Dictionary<Parameter[]>;
  responseDef: ResponseDef;
  simpleName: string;
  methodName: string;
}
