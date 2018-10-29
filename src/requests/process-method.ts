/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';
import {isValidPropertyName} from 'tsutils';

import * as conf from '../conf';
import {Parameter, ParamLocation} from '../types';
import {indent, makeComment} from '../utils';
import {processParams, ProcessParamsOutput} from './process-params';
import {ControllerMethod, Dictionary, MethodOutput} from './requests.models';

/**
 * Transforms method definition to typescript method
 * with single typed param object that is separated into several objects
 * and passed to api service
 * @param method data needed for method processing
 * @param unwrapSingleParamMethods boolean
 */
export function processMethod(method: ControllerMethod, unwrapSingleParamMethods: boolean): MethodOutput {
  let methodDef = '';
  let interfaceDef = '';
  const url = method.url.replace(/{([^}]+})/g, '$${pathParams.$1');
  const allowed: string[] = conf.allowedParams[method.methodName];
  let paramSeparation: string[] = [];
  let paramsSignature = '';
  let params: string;
  let usesGlobalType = false;
  let paramTypes: ParamLocation[] = [];
  let paramGroups: Partial<Record<ParamLocation, Parameter[]>> = {};
  let splitParamsMethod = '';
  const simpleName = method.simpleName;
  const methodName = method.methodName;

  if (method.paramDef) {
    const paramDef = method.paramDef.filter(df => allowed.includes(df.in));
    paramGroups = _.groupBy(paramDef, 'in');
    const paramsType = _.upperFirst(`${method.simpleName}Params`);
    const processedParams = processParams(paramDef, paramsType);

    paramTypes = Object.keys(paramGroups) as ParamLocation[];
    paramSeparation = getParamSeparation(paramGroups);
    paramsSignature = getParamsSignature(processedParams, paramsType);
    usesGlobalType = processedParams.usesGlobalType;
    interfaceDef = getInterfaceDef(processedParams);

    if (unwrapSingleParamMethods && processedParams.typesOnly.length > 0 && paramDef.length === 1) {
      splitParamsMethod = getSplitParamsMethod(method, processedParams);
    }
  }

  params = getRequestParams(paramTypes, method.methodName);

  methodDef += '\n';
  methodDef += makeComment([method.summary, method.description, method.swaggerUrl].filter(Boolean));
  methodDef += `${method.simpleName}(${paramsSignature}): Observable<${method.responseDef.type}> {\n`;

  // apply the param definitions, e.g. bodyParams
  methodDef += indent(paramSeparation);
  if (paramSeparation.length) methodDef += '\n';

  const body = `return this.http.${method.methodName}<${method.responseDef.type}>` +
               `(\`${method.basePath}${url}\`${params});`;
  methodDef += indent(body);
  methodDef += `\n`;
  methodDef += `}`;

  methodDef += splitParamsMethod;

  if (method.responseDef.enumDeclaration) {
    if (interfaceDef) interfaceDef += '\n';
    interfaceDef += `${method.responseDef.enumDeclaration}\n`;
  }
  const responseDef = method.responseDef;
  return {methodDef, interfaceDef, usesGlobalType, paramGroups, responseDef, simpleName, methodName};
}

function getSplitParamsMethod(method: ControllerMethod, processedParams: ProcessParamsOutput) {
  let splitParamsMethod = '';

  const splitParamsSignature = getSplitParamsSignature(processedParams);
  splitParamsMethod += `\n${method.simpleName}_(${splitParamsSignature}): Observable<${method.responseDef.type}> {\n`;

  const propAssignments = getPropertyAssignments(method.paramDef);
  splitParamsMethod += indent(`return this.${method.simpleName}(${propAssignments});\n`);
  splitParamsMethod += '}\n';

  return splitParamsMethod;
}

/**
 * Creates a definition of paramsSignature, which serves as input to http methods
 * @param processedParams
 * @param paramsType
 */
function getParamsSignature(processedParams: ProcessParamsOutput, paramsType: string) {
  return !processedParams.isInterfaceEmpty ? `params: ${paramsType}` : '';
}

function getSplitParamsSignature(paramsOutput: ProcessParamsOutput): string {
  return paramsOutput.typesOnly;
}

function getPropertyAssignments(params: Parameter[]): string {
  return '{' + params.map(p => p.name).join(', ') + '}';
}

/**
 * Creates a definition of interfaceDef, which defines interface for the http method input
 * @param processedParams
 */
function getInterfaceDef(processedParams: ProcessParamsOutput) {
  return !processedParams.isInterfaceEmpty ? processedParams.paramDef : '';
}

/**
 * Creates a definition of pathParams, bodyParams, queryParms or formDataParams
 * @param paramGroups
 */
function getParamSeparation(paramGroups: Dictionary<Parameter[]>): string[] {
  return _.map(paramGroups, (group, groupName) => {
    let baseDef: string;
    let def: string;
    const list = _.map(group, p => setObjectProps(p.name));

    if (groupName === 'query') {
      baseDef = '{\n' + indent(list) + '\n};';

      def = `const queryParamBase = ${baseDef}\n\n`;
      def += 'let queryParams = new HttpParams();\n';
      def += 'Object.entries(queryParamBase).forEach(([key, value]) => {\n';
      def += '  if (value !== undefined) {\n';
      def += '    if (typeof value === \'string\') queryParams = queryParams.set(key, value);\n';
      def += '    else queryParams = queryParams.set(key, JSON.stringify(value));\n';
      def += '  }\n';
      def += '});\n';

      return def;
    }

    if (groupName === 'body') {
      // when the schema: { '$ref': '#/definitions/exampleDto' } construct is used
      if ('schema' in group[0]) {
        def = `params.${group[0].name};`;
      } else {
        def = '{\n' + indent(list) + '\n};';
      }

      // bodyParams keys with value === undefined are removed
      let res = `const ${groupName}Params = ${def}\n`;
      res += 'const bodyParamsWithoutUndefined: any = {};\n';
      res += 'Object.entries(bodyParams || {}).forEach(([key, value]) => {\n';
      res += '  if (value !== undefined) bodyParamsWithoutUndefined[key] = value;\n';
      res += '});';

      return res;
    }

    def = '{\n' + indent(list) + '\n}';
    if (groupName === 'header') {
      def = `new HttpHeaders(${def})`;
    }
    def += ';';

    return `const ${groupName}Params = ${def}`;
  });
}

/**
 * Returns a list of additional params for http client call invocation
 * @param paramTypes list of params types
 * @param methodName name of http method to invoke
 */
function getRequestParams(paramTypes: ParamLocation[], methodName: string) {
  let res = '';

  if (['post', 'put', 'patch'].includes(methodName)) {
    if (paramTypes.includes('body')) {
      res += ', bodyParamsWithoutUndefined';
    } else if (paramTypes.includes('formData')) {
      res += ', formDataParams';
    } else {
      res += ', {}';
    }
  }

  const optionParams: string[] = [];
  if (paramTypes.includes('query')) {
    optionParams.push('params: queryParams');
  }
  if (paramTypes.includes('header')) {
    optionParams.push('headers: headerParams');
  }

  if (optionParams.length) res += `, {${optionParams.join(', ')}}`;

  return res;
}

function setObjectProps(key: string) {
  if (isValidPropertyName(key)) return `${key}: params.${key},`;
  else return `'${key}': params['${key}'],`;
}
