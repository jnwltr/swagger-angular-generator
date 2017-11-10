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

  interfaceDef = getIntefaceObjectDeclaration(interfaceDef, method);

  // define method name
  methodDef += `${method.simpleName}(${paramsSignature}): Observable<${method.responseDef.type}> {\n`;

  // apply the param definitions, e.g. bodyParams
  methodDef += indent(paramSeparation);
  if (paramSeparation.length) {
    methodDef += '\n';
  }

  if (paramTypes.includes('query')) {
    methodDef += `\n`;
    methodDef += indent(assignQueryParamsObject());
    methodDef += `\n`;
  }

  const body = `return this.http.${method.methodName}<${method.responseDef.type}>(\`${url}\`${params});`;
  methodDef += indent(body);
  methodDef += `\n`;
  methodDef += `}`;

  return {methodDef, interfaceDef, usesGlobalType};
}

/**
 * Creates a definition of pathParams, bodyParams, queryParms or formDataParams
 * @param paramGroups
 */
function getParamSeparation(paramGroups: Dictionary<Parameter[]>): string[] {
  return _.map(paramGroups, (group, groupName) => {
    let def: string;
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

// return the definition of intefrace objects
function getIntefaceObjectDeclaration(interfaceDef: string, method: ControllerMethod) {
  if (method.responseDef.enumDeclaration) {
    if (interfaceDef) {
      interfaceDef += '\n';
    }
    interfaceDef += method.responseDef.enumDeclaration + '\n';
  }
  return interfaceDef;
}

function assignQueryParamsObject() {
  let assignQueryParamsDef = '';
  assignQueryParamsDef += `const httpQueryParams = new HttpParams();\n`;
  assignQueryParamsDef += `Object.keys(queryParams).forEach(key => httpQueryParams.append(key, queryParams[key]));\n`;

  return assignQueryParamsDef;
}

// TODO! recheck with original code, allowed params logic lost???
function getRequestParams(paramTypes: string[], methodName: string) {
  let res = '';

  if (['post', 'put', 'patch'].includes(methodName)) {
    if (paramTypes.includes('body')) {
      res += `, bodyParams`;
    } else if (paramTypes.includes('formData')) {
      res += `, formDataParams`;
    } else {
      res += `, {}`;
    }
  }

  if (paramTypes.includes('query')) {
    res += `, {params: httpQueryParams}`;
  }

  return res;
}
