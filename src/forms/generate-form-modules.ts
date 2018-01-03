import {ControllerMethod, MethodOutput} from '../requests/requests.models';
import {Config} from '../generate';
import {createDir} from '../utils';
import * as path from 'path';
import * as conf from '../conf';
import * as _ from 'lodash';
import {createComponentHTML} from './process-html-component';
import {Parameter} from '../types';
import {createComponentTs} from './process-ts-component';
import {createModule} from './process-module';
import {ProcessDefinition} from '../definitions';
import {createRoute} from './process-routes';
import {createSharedModule} from './shared-module';
import {GenerateHttpActions, getActionClassNameBase, getActionTypeNameBase} from './states/generate-http-actions';
import {GenerateHttpReducers} from './states/generate-http-reducers';
import {GenerateHttpEffects} from './states/generate-http-effects';
import {getStateOperationPrefix} from './states/shared-states';

export function createForms(config: Config, name: string, processedMethods: MethodOutput[],
                            schemaObjectDefinitions: ProcessDefinition[], methods: ControllerMethod[]) {

  const paramGroups = processedMethods[0].paramGroups;
  const responseDef = processedMethods[0].responseDef;
  const simpleName = methods[0].simpleName;
  const dashedName = name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();

  const formParamGroups: Parameter[] = [];
  if ('body' in paramGroups) _.merge(formParamGroups, paramGroups.body);
  if ('formData' in paramGroups) _.merge(formParamGroups, paramGroups.formData);

  const formDirName = path.join(config.dest, conf.formDir, `${dashedName}`);
  createDir(formDirName);

  const operationPrefix = getStateOperationPrefix(methods);
  const actionClassNameBase = getActionClassNameBase(name, simpleName, operationPrefix);
  const actionTypeNameBase = getActionTypeNameBase(name, simpleName, operationPrefix);

  if (['put', 'patch', 'post'].indexOf(methods[0].methodName) > -1) {
      // component.ts
      createComponentTs(config, dashedName, name, formParamGroups, schemaObjectDefinitions, simpleName);

      // component.html
      createComponentHTML(config, dashedName, name, formParamGroups, schemaObjectDefinitions);
  }

  // routes.ts
  createRoute(config, name, dashedName);

  // states
  const statesDirName = path.join(config.dest, conf.formDir, `/${dashedName}/states`);
  createDir(statesDirName);

  // actions.ts
  GenerateHttpActions(config, name, dashedName, responseDef, actionClassNameBase, actionTypeNameBase);

  // reducers.ts
  GenerateHttpReducers(config, name, dashedName, simpleName, responseDef, methods, schemaObjectDefinitions,
      actionClassNameBase, actionTypeNameBase);

  // effects.ts
  GenerateHttpEffects(config, name, dashedName, simpleName, actionClassNameBase, actionTypeNameBase);

  // form-shared-module.ts
  createSharedModule(config);

  // module.ts
  createModule(config, name, dashedName, actionClassNameBase);
}
