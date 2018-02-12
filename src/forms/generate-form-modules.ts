import * as _ from 'lodash';
import * as path from 'path';
import * as conf from '../conf';
import {ProcessDefinition} from '../definitions';
import {Config} from '../generate';
import {MethodOutput} from '../requests/requests.models';
import {Parameter} from '../types';
import {createDir} from '../utils';
import {createComponentHTML} from './process-html-component';
import {createModule} from './process-module';
import {createRoute} from './process-routes';
import {createComponentTs} from './process-ts-component';
import {createSharedModule} from './shared-module';
import {
    GenerateHttpActions, getActionClassNameBase, getActionTypeNameBase,
    getClassName,
} from './states/generate-http-actions';
import {GenerateHttpEffects} from './states/generate-http-effects';
import {GenerateHttpReducers} from './states/generate-http-reducers';
import {getStateOperationPrefix} from './states/shared-states';

export function createForms(config: Config, name: string, processedMethods: MethodOutput[],
                            schemaObjectDefinitions: ProcessDefinition[]) {

  const dashedName = name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
  const formBaseDirName = path.join(config.dest, conf.formDir);
  createDir(formBaseDirName);

  const formDirName = path.join(config.dest, conf.formDir, `${dashedName}`);
  createDir(formDirName);

  for (const processedMethod of processedMethods) {
    const paramGroups = processedMethod.paramGroups;
    const responseDef = processedMethod.responseDef;
    const simpleName = processedMethod.simpleName;
    const methodName = processedMethod.methodName;
    let isGetMethod = true;

    const formSubDirName = path.join(config.dest, conf.formDir, `${dashedName}`, simpleName);
    createDir(formSubDirName);

    const formParamGroups: Parameter[] = [];
    if ('body' in paramGroups) _.merge(formParamGroups, paramGroups.body);
    if ('formData' in paramGroups) _.merge(formParamGroups, paramGroups.formData);

    const operationPrefix = getStateOperationPrefix(methodName);
    const actionClassNameBase = getActionClassNameBase(name, simpleName, operationPrefix);
    const actionTypeNameBase = getActionTypeNameBase(name, simpleName, operationPrefix);
    const className = getClassName(name, simpleName);

    if (['put', 'patch', 'post'].indexOf(methodName) > -1) {
      isGetMethod = false;
      // component.ts
      createComponentTs(config, name, formParamGroups, schemaObjectDefinitions, simpleName, formSubDirName,
                        className);

      // component.html
      createComponentHTML(config, name, formParamGroups, schemaObjectDefinitions, formSubDirName, simpleName);

      // routes.ts
      createRoute(config, formSubDirName, simpleName, className);
    }

    // states
    const statesDirName = path.join(formSubDirName, `states`);
    createDir(statesDirName);

    // actions.ts
    GenerateHttpActions(config, name, responseDef, actionClassNameBase, actionTypeNameBase, simpleName,
        formSubDirName, formParamGroups);

    // reducers.ts
    GenerateHttpReducers(config, actionClassNameBase, actionTypeNameBase, formSubDirName);

    // effects.ts
    GenerateHttpEffects(config, name, simpleName, actionClassNameBase, actionTypeNameBase, formSubDirName,
        formParamGroups);

    // form-shared-module.ts
    createSharedModule(config);

    // module.ts
    createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, isGetMethod);
  }
}
