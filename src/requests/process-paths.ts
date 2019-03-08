/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';
import * as conf from '../conf';
import {ProcessedDefinition} from '../definitions';
import {Config} from '../generate';
import {Method, MethodName} from '../types';
import {merge} from '../utils';
import {processController} from './process-controller';
import {ControllerMethod, Paths, PathsWithParameters} from './requests.models';

/**
 * Entry point, processes all possible api requests and exports them
 * to files devided ty controllers (same as swagger web app sections)
 * @param pathsWithParameters paths from the schema
 * @param swaggerPath swagger base url
 * @param config global configs
 * @param definitions
 * @param basePath base URL path
 */
export function processPaths(pathsWithParameters: PathsWithParameters, swaggerPath: string, config: Config,
                             definitions: ProcessedDefinition[], basePath: string) {

  const paths = preProcessPaths(pathsWithParameters);
  const controllers: ControllerMethod[] = _.flatMap(paths, (methods, url: string) => (
    _.map(methods, (method, methodName: MethodName) => ({
      url,
      name: getName(method),
      methodName,
      simpleName: getSimpleName(url),
      summary: method.summary,
      operationId: method.operationId,
      swaggerUrl: `${swaggerPath}${method.tags[0]}/${method.operationId}`,
      description: method.description,
      paramDef: method.parameters,
      responses: method.responses,
      responseDef: null,
      basePath,
    }))
  ));

  const controllerFiles = _.groupBy(controllers, 'name');
  conf.controllerIgnores.forEach(key => delete controllerFiles[key]);
  _.forEach(controllerFiles, (methods, name) => processController(methods, name, config, definitions));
}

/**
 * Returns simple name from last static URL segment
 * example: `/accounts/${accountId}/updateMothersName` => `updateMothersName`
 * @param url
 */
function getSimpleName(url: string) {
  // remove url params
  let method = url.replace(/\/{[^}]+}/g, '');
  // remove trailing `/` if present
  method = method.replace(/\/$/, '');
  // take trailing url folder
  method = method.replace(/(.*\/)*/, '');
  // subst spaces and underscores
  method = _.camelCase(method);
  method = method.replace(/[^\w]/g, '');

  return method;
}

/**
 * Returns name of the method
 * @param method
 */
function getName(method: Method) {
  return _.upperFirst(_.camelCase(method.tags[0].replace(/(-rest)?-controller/, '')));
}

/**
 * One of the allowed swagger formats is that under given url, there can be methods like get, post, put etc., but also
 * parameters that often defines a path parameter common for the HTTP methods.
 * This method extends HTTP method (get, post ...) parameters with the above mentioned parameters
 * @param paths
 */
function preProcessPaths(paths: PathsWithParameters): Paths {
  Object.values(paths).forEach(pathValue => {
    if (pathValue.parameters) {
      Object.keys(pathValue).forEach(key => {
        if (key === 'parameters') return;

        const method = pathValue[key as MethodName];
        method.parameters = merge(method.parameters, pathValue.parameters, 'in', 'name');
      });
    }

    delete pathValue.parameters;
  });

  return paths as Paths;
}
