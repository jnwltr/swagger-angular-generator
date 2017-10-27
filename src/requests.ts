/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';
import * as path from 'path';

import {processProperty} from './common';
import * as conf from './conf';
import {Config} from './generate';
import {HttpCode, HttpResponse, Method, MethodName, Parameter} from './types';
import {emptyDir, indent, makeComment, writeFile} from './utils';

export interface Paths {
  [key: string]: {
    [key in MethodName]?: Method;
  };
}

interface ControllerMethod {
  summary: string;
  operationId: string;
  description: string;
  methodName: MethodName;
  simpleName: string;
  name: string;
  url: string;
  swaggerUrl: string;
  responses: HttpResponse;
  responseDef: {
    type: string;
    enumDeclaration: string;
    usesGlobalType: boolean;
  };
  paramDef: Parameter[];
}

/**
 * Entry point, processes all possible api requests and exports them
 * to files devided ty controllers (same as swagger web app sections)
 * @param paths paths from the schema
 * @param swaggerPath swagger base url
 */
export function processPaths(paths: Paths, swaggerPath: string, config: Config) {
  emptyDir(path.join(config.dest, conf.apiDir));

  const controllers: ControllerMethod[] = _.flatMap(paths, (methods, url) => (
    _.map(methods, (method, methodName: MethodName) => ({
      url,
      name: _.upperFirst(_.camelCase(
        method.tags[0].replace(/(-rest)?-controller/, ''))),
      methodName,
      simpleName: getSimpleName(url),
      summary: method.summary,
      operationId: method.operationId,
      swaggerUrl: `${swaggerPath}${method.tags[0]}/${method.operationId}`,
      description: method.description,
      paramDef: method.parameters,
      responses: method.responses,
      responseDef: null,
    }))
  ));

  const controllerFiles = _.groupBy(controllers, 'name');
  conf.controllerIgnores.forEach(key => delete controllerFiles[key]);
  _.forEach(controllerFiles, (methods, name) => processController(methods, name, config));
}

/**
 * Creates and serializes class for api communication for controller
 * @param controllers list of methods of the controller
 * @param name
 */
function processController(methods: ControllerMethod[], name: string, config: Config) {
  const filename = path.join(config.dest, conf.apiDir, `${name}.ts`);
  let usesGlobalType = false;

  // make simpleNames unique and process responses
  const simpleNames = _.map(methods, 'simpleName');
  methods.forEach(controller => {
    if (simpleNames.filter(n => n === controller.simpleName).length > 1) {
      controller.simpleName = controller.operationId;
    }

    controller.responseDef = processResponses(controller.responses, controller.simpleName);
    usesGlobalType = usesGlobalType || controller.responseDef.usesGlobalType;
  });

  const processedMethods = methods.map(processMethod);
  usesGlobalType = usesGlobalType || processedMethods.some(c => c.usesGlobalType);

  let content = '';
  content += 'import { Injectable } from \'@angular/core\';\n';
  content += 'import { Observable } from \'rxjs/Observable\';\n';
  content += '\n';
  if (usesGlobalType) {
    content += `import * as ${conf.modelFile} from \'../${conf.modelFile}\';\n`;
  }
  content += 'import { ApiService } from \'../services/api\';\n';
  content += '\n';

  const interfaceDef = _.map(processedMethods, 'interfaceDef').filter(Boolean).join('\n');
  if (interfaceDef) {
    content += interfaceDef;
    content += '\n';
  }

  content += `@Injectable()\n`;
  content += `export class ${name}Service {\n`;
  content += indent('constructor(private apiService: ApiService) {}');
  content += '\n';
  content += indent(_.map(processedMethods, 'methodDef').join('\n\n'));
  content += '\n}\n';

  if (conf.adHocExceptions.api[name]) {
    content = content.replace(conf.adHocExceptions.api[name][0],
                              conf.adHocExceptions.api[name][1]);
  }

  writeFile(filename, content, config.header);
}

/**
 * Process all responses of one method
 * @param httpResponse response object
 * @param name of the context for type name uniqueness
 */
function processResponses(httpResponse: HttpResponse, name: string) {
  const responses = _.filter(httpResponse, (r, status: HttpCode) => (
    r.schema && Math.floor(Number(status) / 100) === 2));
  const properties = _.map(responses, response => (
    processProperty(response.schema, undefined, `${name}`)
  ));

  const property = _.map(properties, 'property');
  const enumDeclaration = _.map(properties, 'enumDeclaration').filter(Boolean).join('\n\n');
  const usesGlobalType = properties.some(p => !p.native);

  let type: string;
  if (property.length) {
    type = _.uniqWith(property, _.isEqual).join(' | ');
  } else {
    type = 'void';
  }

  return {type, enumDeclaration, usesGlobalType};
}

interface MethodOutput {
  methodDef: string;
  interfaceDef: string;
  usesGlobalType: boolean;
}

/**
 * Transforms method definition to typescript method
 * with single typed param object that is separated into several objects
 * and passed to api service
 * @param controller
 */
function processMethod(method: ControllerMethod): MethodOutput {
  let methodDef = '';
  let interfaceDef = '';
  const url = method.url.replace(/\/{([^}]+})/g, '/$${pathParams.$1');
  const allowed: string[] = conf.allowedParams[method.methodName];
  let paramSeparation: string[] = [];
  let paramsSignature = '';
  let params = '';
  let usesGlobalType = false;

  if (method.paramDef) {
    const paramDef = method.paramDef.filter(df => allowed.indexOf(df.in) >= 0);
    const paramGroups = _.groupBy(paramDef, 'in');

    paramSeparation = _.map(paramGroups, (group, groupName) => {
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

    const paramsType = _.upperFirst(`${method.simpleName}Params`);
    paramsSignature = `params: ${paramsType}`;

    const processedParams = processParams(paramDef, paramsType);
    usesGlobalType = processedParams.usesGlobalType;
    interfaceDef = processedParams.paramDef;

    allowed.forEach((ap: string) => {
      // empty declaration
      if (!paramGroups[ap] && (ap !== 'path' || url !== method.url)) {
        let paramType;
        if (ap === 'formData') paramType = '{[key: string]: File}';
        else paramType = 'object';
        paramSeparation.push(`const ${ap}Params: ${paramType} = undefined;`);
      }
      // path params are interpolated directly in url
      if (ap !== 'path') params += `, ${ap}Params`;
    });
  }
  methodDef += '\n';

  methodDef += makeComment([
    method.summary, method.description, method.swaggerUrl,
  ].filter(Boolean));

  if (method.responseDef.enumDeclaration) {
    if (interfaceDef) {
      interfaceDef += '\n';
    }
    interfaceDef += method.responseDef.enumDeclaration + '\n';
  }
  methodDef += `${method.simpleName}(${paramsSignature}): Observable<` +
    `${method.responseDef.type}> {\n`;

  methodDef += indent(paramSeparation);
  if (paramSeparation.length) {
    methodDef += '\n';
  }

  const body = `return this.apiService.${method.methodName}(\`${url}\`${params});`;
  methodDef += indent(body);
  methodDef += `\n`;
  methodDef += `}`;

  return {methodDef, interfaceDef, usesGlobalType};
}

/**
 * Transforms input parameters to interfaces definition
 * @param def definition
 * @param paramsType name of the type
 */
function processParams(def: Parameter[], paramsType: string) {
  let paramDef = '';
  paramDef += `export interface ${paramsType} {\n`;

  const params = _.map(def, p => processProperty({
    // TODO(janwalter) might be unnecessary for v3.0+ of OpenAPI spec
    // https://swagger.io/specification/#parameterObject
    ...{
      enum: p.enum,
      items: p.items,
      type: p.type,
      description: p.description,
      format: p.format,
    },
    ...p.schema, // move level up
    }, p.name, paramsType, p.required),
  );

  const usesGlobalType = params.some(p => !p.native);

  paramDef += indent(_.map(params, 'property') as string[]);
  paramDef += `\n`;
  paramDef += `}\n`;
  const enums = _.map(params, 'enumDeclaration').filter(Boolean);
  if (enums.length) {
    paramDef += `\n`;
    paramDef += enums.join('\n\n');
    paramDef += `\n`;
  }

  return {paramDef, usesGlobalType};
}

/**
 * Returns simple name from last static URL segment
 * example: `/accounts/${accountId}/updateMothersName` => `updateMothersName`
 * @param url
 */
function getSimpleName(url: string) {
  // remove url params
  let method = url.replace(/\/{[^}]+}/g, '');
  // take trailing url folder
  method = method.replace(/(.*\/)*/, '');

  return method;
}
