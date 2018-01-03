import * as path from 'path';

import {stateDir} from '../../conf';
import {Config} from '../../generate';
import {indent, writeFile} from '../../utils';

export function generateHttpReducers(config: Config, actionClassNameBase: string,
                                     formSubDirName: string, responseType: string) {
  let content = '';
  content += getReducerImports(responseType.startsWith('model.'));
  content += getStateInteface(actionClassNameBase, responseType);
  content += getInitialState(actionClassNameBase);
  content += getFeatureSelector(actionClassNameBase);
  content += getReducerDefinition(actionClassNameBase);

  const reducersFileName = path.join(formSubDirName, stateDir, `reducers.ts`);
  writeFile(reducersFileName, content, config.header);
}

function getReducerImports(usesModels: boolean) {
  let res = `import {createFeatureSelector} from '@ngrx/store';\n\n`;
  if (usesModels) res += `import * as model from '../../../../model';\n`;
  res += `import * as actions from './actions';\n\n`;

  return res;
}

function getStateInteface(actionClassNameBase: string, type: string) {
  let res = `export interface ${actionClassNameBase}State {\n`;
  res += indent(`data: ${type};\n`);
  res += indent(`loading: boolean;\n`);
  res += indent(`error: string;\n`);
  res += `}\n\n`;

  return res;
}

function getInitialState(actionClassNameBase: string) {
  let res = `export const initial${actionClassNameBase}State: ${actionClassNameBase}State = {\n`;
  res += indent(`data: null,\n`);
  res += indent(`loading: false,\n`);
  res += indent(`error: null,\n`);
  res += `};\n\n`;

  return res;
}

function getFeatureSelector(actionClassNameBase: string) {
  let res = `export const selectorName = '${actionClassNameBase}';\n`;
  res += `export const get${actionClassNameBase}StateSelector = ` +
         `createFeatureSelector<${actionClassNameBase}State>(selectorName);\n\n`;

  return res;
}

function getReducerDefinition(actionClassNameBase: string) {
  let res = `export function ${actionClassNameBase}Reducer(\n`;
  res += indent(`state: ${actionClassNameBase}State = initial${actionClassNameBase}State,\n`);
  res += indent(`action: actions.${actionClassNameBase}Action): ${actionClassNameBase}State {\n\n`);
  res += indent(`switch (action.type) {\n`);
  res += indent([
    'case actions.Actions.START: return {...state, loading: true, error: null};',
    'case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};',
    'case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};',
    'default: return state;',
  ], 2);
  res += indent(`\n}\n`);
  res += `}\n`;

  return res;
}
