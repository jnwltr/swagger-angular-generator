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
import {GenerateHttpActions, getActionClassNameBase, getClassName} from './states/generate-http-actions';
import {GenerateHttpEffects} from './states/generate-http-effects';
import {GenerateHttpReducers} from './states/generate-http-reducers';

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
    // TODO! verify the idea behind this
    if ('formData' in paramGroups) _.merge(formParamGroups, paramGroups.formData);
    else if ('body' in paramGroups) _.merge(formParamGroups, paramGroups.body);
    if ('query' in paramGroups) _.merge(formParamGroups, paramGroups.query);

    const actionClassNameBase = getActionClassNameBase(simpleName);
    const className = getClassName(simpleName);

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
    const statesDirName = path.join(formSubDirName, 'states');
    createDir(statesDirName);

    // actions.ts
    GenerateHttpActions(config, name, responseDef, actionClassNameBase, simpleName, formSubDirName, formParamGroups);

    // reducers.ts
    GenerateHttpReducers(config, actionClassNameBase, formSubDirName);

    // effects.ts
    GenerateHttpEffects(config, name, simpleName, actionClassNameBase, formSubDirName, formParamGroups);

    // form-shared-module.ts
    createSharedModule(config);

    // module.ts
    createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, isGetMethod);
  }
}
