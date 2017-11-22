/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';
import * as conf from '../conf';
import {Parameter} from '../types';
import {indent, makeComment} from '../utils';
import {processParams} from './process-params';
import {ControllerMethod, Dictionary, MethodOutput} from './requests.models';

/**
 * Transforms method definition to typescript method
 * with single typed param object that is separated into several objects
 * and passed to api service
 * @param controller
 */
export function processMethod(method: ControllerMethod): MethodOutput {
  let methodDef = '';
  let interfaceDef = '';
  const url = method.url.replace(/\/{([^}]+})/g, '/$${pathParams.$1');
  const allowed: string[] = conf.allowedParams[method.methodName];
  let paramSeparation: string[] = [];
  let paramsSignature = '';
  let params = '';
  let usesGlobalType = false;
  let paramTypes: string[] = [];

  if (method.paramDef) {
    const paramDef = method.paramDef.filter(df => allowed.includes(df.in));
    const paramGroups = _.groupBy(paramDef, 'in');
    const paramsType = _.upperFirst(`${method.simpleName}Params`);
    const processedParams = processParams(paramDef, paramsType);

    paramTypes = Object.keys(paramGroups);
    paramSeparation = getParamSeparation(paramGroups);
    paramsSignature = `params: ${paramsType}`;
    usesGlobalType = processedParams.usesGlobalType;
    interfaceDef = processedParams.paramDef;

    params += getRequestParams(paramTypes, method.methodName);
  }

  methodDef += '\n';
  methodDef += makeComment([method.summary, method.description, method.swaggerUrl].filter(Boolean));
  methodDef += `${method.simpleName}(${paramsSignature}): Observable<${method.responseDef.type}> {\n`;

  // apply the param definitions, e.g. bodyParams
  methodDef += indent(paramSeparation);
  if (paramSeparation.length) methodDef += '\n';

  const body = `return this.http.${method.methodName}<${method.responseDef.type}>(\`${url}\`${params});`;
  methodDef += indent(body);
  methodDef += `\n`;
  methodDef += `}`;

  if (method.responseDef.enumDeclaration) {
    if (interfaceDef) interfaceDef += '\n';
    interfaceDef += `${method.responseDef.enumDeclaration}\n`;
  }

  return {methodDef, interfaceDef, usesGlobalType};
}

/**
 * Creates a definition of pathParams, bodyParams, queryParms or formDataParams
 * @param paramGroups
 */
function getParamSeparation(paramGroups: Dictionary<Parameter[]>): string[] {
  return _.map(paramGroups, (group, groupName) => {
    let baseDef: string;
    let def: string;

    if (groupName === 'query') {
      const list = _.map(group, p => `${p.name}: params.${p.name},`);
      baseDef = '{\n' + indent(list) + '\n};';
      def = `const queryParamBase = ${baseDef}\n\n`;

      def += 'let queryParams = new HttpParams();\n';

      def += `Object.entries(queryParamBase).forEach(([key, value]) => {\n`;
      def += indent(`if (value !== undefined) {\n`);
      def += indent(indent(`if (typeof value === 'string') {\n`));
      def += indent(indent(indent(`queryParams = queryParams.set(key, value);\n`)));
      def += indent(indent(`} else {\n`));
      def += indent(indent(indent(`queryParams = queryParams.set(key, JSON.stringify(value));\n`)));
      def += indent(indent(`}\n`));
      def += indent(`}\n`);
      def += `});\n`;

      return def;
    }

    // only one direct body parameter is allowed
    // 1st one taken if more of them present
    if (groupName === 'body') {
      def = `params.${group[0].name};`;
    } else {
      const list = _.map(group, p => `${p.name}: params.${p.name},`);
      def = '{\n' + indent(list) + '\n};';
    }

    return `const ${groupName}Params = ${def}`;
  });
}

/**
 * Returns a list of additional params for http client call invocation
 * @param paramTypes list of params types (should be from `path`, `body`, `query`, `formData`)
 * @param methodName name of http method to invoke
 */
function getRequestParams(paramTypes: string[], methodName: string) {
  let res = '';

  if (['post', 'put', 'patch'].includes(methodName)) {
    if (paramTypes.includes('body')) {
      res += `, bodyParams`;
    } else if (paramTypes.includes('formData')) {
      res += `, formDataParams`;
    } else {
      // TODO(jnwltr) check if {} is not needed
      res += `, undefined`;
    }
  }

  if (paramTypes.includes('query')) {
    res += `, {params: queryParams}`;
  }

  return res;
}
