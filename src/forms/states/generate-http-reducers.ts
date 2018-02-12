import * as path from 'path';
import {indent, writeFile} from '../../utils';
import {Config} from '../../generate';

export function GenerateHttpReducers(config: Config, actionClassNameBase: string, actionTypeNameBase: string,
                                     formSubDirName: string) {

  // TODO - implement initial state logic

  let content = '';
  content = getReducerImports(content);
  content = getStateInteface(content, actionClassNameBase);
  content = getInitialState(content, actionClassNameBase);
  content = getFeatureSelector(content, actionClassNameBase);
  content = getReducerDefinition(content, actionTypeNameBase, actionClassNameBase);

  const reducersFileName = path.join(formSubDirName, `states`, `reducers.ts`);
  writeFile(reducersFileName, content, config.header);
}

export function getReducerImports(content: string) {
  content += `import {createFeatureSelector} from '@ngrx/store';\n`;
  content += `import * as actions from './actions';\n`;
  content += `\n`;
  return content;
}

export function getStateInteface(content: string, actionClassNameBase: string) {
  content += `export interface ${actionClassNameBase}State {\n`;
  content += indent(`data: object;\n`);
  content += indent(`loading: boolean;\n`);
  content += indent(`error: string;\n`);
  content += `}\n`;
  content += `\n`;
  return content;
}

export function getInitialState(content: string, actionClassNameBase: string) {
  content += `export const initial${actionClassNameBase}State: ${actionClassNameBase}State = {\n`;
  content += indent(`data: {},\n`);
  content += indent(`loading: false,\n`);
  content += indent(`error: '',\n`);
  content += `};\n`;
  content += `\n`;
  return content;
}

export function getFeatureSelector(content: string, actionClassNameBase: string) {
  content += `export const get${actionClassNameBase}StateSelector = createFeatureSelector<${actionClassNameBase}State>('${actionClassNameBase}');\n`;
  content += `\n`;
  return content;
}

export function getReducerDefinition(content: string, actionTypeNameBase: string, actionClassNameBase: string) {
  content += `export function ${actionClassNameBase}Reducer(\n`;
  content += indent(`state: ${actionClassNameBase}State = initial${actionClassNameBase}State,\n`);
  content += indent(`action: actions.All${actionClassNameBase}Actions): ${actionClassNameBase}State {\n`);
  content += `\n`;
  content += indent(`switch (action.type) {\n`);
  content += indent(`case actions.${actionTypeNameBase}_START:\n`);
  content += indent(`return {...state, loading: true, error: null};\n`);
  content += `\n`;
  content += indent(`case actions.${actionTypeNameBase}_SUCCESS:\n`);
  content += indent(`return {...state, data: action.payload, loading: false};\n`);
  content += `\n`;
  content += indent(`case actions.${actionTypeNameBase}_ERROR:\n`);
  content += indent(`return {...state, error: action.payload, loading: false};\n`);
  content += `\n`;
  content += indent(`default:\n`);
  content += indent(indent(`return state;\n`));
  content += indent(`}\n`);
  content += `}\n`;
  return content;
}
