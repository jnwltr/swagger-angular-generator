/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';
import * as path from 'path';

import * as conf from '../conf';
import { Config } from '../generate';
import { Method, MethodName } from '../types';
import { emptyDir } from '../utils';
import { processController } from './process-controller';
import { ControllerMethod, Paths } from './requests.models';

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
      name: getName(method),
      methodName,
      simpleName: getSimpleName(method),
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

function getName(method: Method) {
    const name = _.upperFirst(_.camelCase(
        method.tags[0].replace(/(-rest)?-controller/, '')));
    return name;
}

function getSimpleName(method: Method) {
    // e.g. api-token-refresh_create gets turned into ApiTokenRefreshCreate
    const nameArray = method.operationId.split(new RegExp('[-_ ]', 'g'));
    const nameArrayUpperFirst = nameArray.map(x => _.upperFirst(x));
    return nameArrayUpperFirst.join('');
}
