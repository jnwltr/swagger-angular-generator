import * as path from 'path';

import {Config} from '../../generate';
import {indent, writeFile} from '../../utils';

export function GenerateHttpReducers(config: Config, actionClassNameBase: string, actionTypeNameBase: string,
                                     formSubDirName: string) {

  // TODO implement initial state logic
  let content = '';
  content += getReducerImports();
  content += getStateInteface(actionClassNameBase);
  content += getInitialState(actionClassNameBase);
  content += getFeatureSelector(actionClassNameBase);
  content += getReducerDefinition(actionTypeNameBase, actionClassNameBase);

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
  res += indent(`data: object;\n`);
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

function getReducerDefinition(actionTypeNameBase: string, actionClassNameBase: string) {
  let res = `export function ${actionClassNameBase}Reducer(\n`;
  res += indent(`state: ${actionClassNameBase}State = initial${actionClassNameBase}State,\n`);
  res += indent(`action: actions.All${actionClassNameBase}Actions): ${actionClassNameBase}State {\n`);
  res += `\n`;
  res += indent(`switch (action.type) {\n`);
  res += indent(`case actions.${actionTypeNameBase}_START:\n`);
  res += indent(`return {...state, loading: true, error: null};\n`);
  res += `\n`;
  res += indent(`case actions.${actionTypeNameBase}_SUCCESS:\n`);
  res += indent(`return {...state, data: action.payload, loading: false};\n`);
  res += `\n`;
  res += indent(`case actions.${actionTypeNameBase}_ERROR:\n`);
  res += indent(`return {...state, error: action.payload, loading: false};\n`);
  res += `\n`;
  res += indent(`default:\n`);
  res += indent(`return state;\n`, 2);
  res += indent(`}\n`);
  res += `}\n`;

  return res;
}
