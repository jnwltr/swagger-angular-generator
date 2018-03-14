import * as path from 'path';

import {Config} from '../../generate';
import {indent, writeFile} from '../../utils';

export function GenerateHttpReducers(config: Config, actionClassNameBase: string, formSubDirName: string) {
  // TODO implement initial state logic
  let content = '';
  content += getReducerImports();
  content += getStateInteface(actionClassNameBase);
  content += getInitialState(actionClassNameBase);
  content += getFeatureSelector(actionClassNameBase);
  content += getReducerDefinition(actionClassNameBase);

  const reducersFileName = path.join(formSubDirName, `states`, `reducers.ts`);
  writeFile(reducersFileName, content, config.header);
}

function getReducerImports() {
  let res = `import {createFeatureSelector} from '@ngrx/store';\n`;
  res += `import * as actions from './actions';\n\n`;

  return res;
}

function getStateInteface(actionClassNameBase: string) {
  let res = `export interface ${actionClassNameBase}State {\n`;
  // TODO! check if store selection returns typed object
  res += indent(`data: any;\n`);
  res += indent(`loading: boolean;\n`);
  res += indent(`error: string;\n`);
  res += `}\n\n`;

  return res;
}

function getInitialState(actionClassNameBase: string) {
  let res = `export const initial${actionClassNameBase}State: ${actionClassNameBase}State = {\n`;
  res += indent(`data: {},\n`);
  res += indent(`loading: false,\n`);
  res += indent(`error: '',\n`);
  res += `};\n\n`;

  return res;
}

function getFeatureSelector(actionClassNameBase: string) {
  return `export const get${actionClassNameBase}StateSelector = ` +
         `createFeatureSelector<${actionClassNameBase}State>('${actionClassNameBase}');\n\n`;
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
