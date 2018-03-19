import * as _ from 'lodash';
import * as path from 'path';

import * as conf from '../conf';
import {ProcessedDefinition} from '../definitions';
import {Config} from '../generate';
import {MethodOutput} from '../requests/requests.models';
import {Parameter} from '../types';
import {createDir} from '../utils';
import {createModule} from './process-module';
import {createComponentTs} from './process-ts-component';
import {createSharedModule} from './shared-module';
import {generateHttpActions, getActionClassNameBase, getClassName} from './states/generate-http-actions';
import {generateHttpEffects} from './states/generate-http-effects';
import {generateHttpReducers} from './states/generate-http-reducers';

export function createForms(config: Config, name: string, processedMethods: MethodOutput[],
                            definitions: ProcessedDefinition[]) {
  const kebabName = _.kebabCase(name);
  const formBaseDir = path.join(config.dest, conf.storeDir);
  const formDirName = path.join(formBaseDir, `${kebabName}`);
  createDir(formDirName);

  for (const processedMethod of processedMethods) {
    const paramGroups = processedMethod.paramGroups;
    const responseDef = processedMethod.responseDef;
    const simpleName = processedMethod.simpleName;
    const methodName = processedMethod.methodName;
    let isGetMethod = true;

    const formSubDirName = path.join(formBaseDir, `${kebabName}`, simpleName);
    createDir(formSubDirName);

    let formParams: Parameter[] = [];
    Object.values(paramGroups).forEach(params => {
      formParams = formParams.concat(params);
    });

    const actionClassNameBase = getActionClassNameBase(simpleName);
    const className = getClassName(simpleName);

    if (['put', 'patch', 'post'].indexOf(methodName) > -1) {
      isGetMethod = false;
      // component.ts
      createComponentTs(config, name, formParams, definitions, simpleName, formSubDirName, className);
    }

    // states
    const statesDirName = path.join(formSubDirName, 'states');
    createDir(statesDirName);

    // actions.ts
    generateHttpActions(config, name, responseDef, actionClassNameBase, simpleName, formSubDirName, formParams);
    // reducers.ts
    generateHttpReducers(config, actionClassNameBase, formSubDirName, responseDef.type);
    // effects.ts
    generateHttpEffects(config, name, simpleName, actionClassNameBase, formSubDirName, formParams);
    // form-shared-module.ts
    createSharedModule(config);
    // module.ts
    createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, isGetMethod);
  }
}
