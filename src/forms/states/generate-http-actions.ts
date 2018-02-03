import * as path from 'path';
import {indent, writeFile} from '../../utils';
import {Config} from '../../generate';
import {ResponseDef} from '../../requests/requests.models';
import * as _ from 'lodash';
import {Parameter} from '../../types';

export function GenerateHttpActions(config: Config, name: string, responseDef: ResponseDef,
                                    actionClassNameBase: string, actionTypeNameBase: string, simpleName: string,
                                    formSubDirName: string, paramGroups: Parameter[]) {

  let content = '';
  content = getActionImports(content, name, simpleName, paramGroups);
  content = getActionTypes(content, name, actionTypeNameBase);

  content = getActionStartDefinition(content, simpleName, actionClassNameBase, actionTypeNameBase);
  content = getActionSuccessDefinition(content, actionClassNameBase, actionTypeNameBase, responseDef);
  content = getActionErrorDefinition(content, actionClassNameBase, actionTypeNameBase);

  content = getActionOverviewType(content, actionClassNameBase);

  const actionsFileName = path.join(formSubDirName, `states`, `actions.ts`);
  writeFile(actionsFileName, content, config.header);
}

export function getActionImports(content: string, name: string, simpleName: string, paramGroups: Parameter[]) {
  content += `import {Action} from '@ngrx/store';\n`;
  if (paramGroups.length) {
    content += `import {${_.upperFirst(simpleName)}Params} from '../../../../controllers/${name}';\n`;
  }
  content += `import * as model from '../../../../model';\n`;
  content += `\n`;
  return content;
}

export function getActionTypes(content: string, name: string, actionTypeNameBase: string) {
  content += `export const ${actionTypeNameBase}_START = '[${name}] Load ${name}';\n`;
  content += `export const ${actionTypeNameBase}_SUCCESS = '[${name}] Load ${name} Success';\n`;
  content += `export const ${actionTypeNameBase}_ERROR = '[${name}] Load ${name} Error';\n`;
  content += `\n`;
  return content;
}

export function getActionStartDefinition(content: string, simpleName: string, actionClassNameBase: string,
                                         actionTypeNameBase: string) {
  content += `export class ${actionClassNameBase}Start implements Action {\n`;
  content += indent(`readonly type = ${actionTypeNameBase}_START;\n`);
  content += indent(`constructor(public payload: ${_.upperFirst(simpleName)}Params) {\n`);
  content += indent(`}\n`);
  content += `}\n`;
  content += `\n`;
  return content;
}

export function getActionSuccessDefinition(content: string, actionClassNameBase: string, actionTypeNameBase: string,
                                           response: ResponseDef) {
  content += `export class ${actionClassNameBase}Success implements Action {\n`;
  content += indent(`readonly type = ${actionTypeNameBase}_SUCCESS;\n`);
  content += indent(`constructor(public payload: ${response.type}) {\n`);
  content += indent(`}\n`);
  content += `}\n`;
  content += `\n`;
  return content;
}

export function getActionErrorDefinition(content: string, actionClassNameBase: string, actionTypeNameBase: string) {
  content += `export class ${actionClassNameBase}Error implements Action {\n`;
  content += indent(`readonly type = ${actionTypeNameBase}_ERROR;\n`);
  content += indent(`constructor(public payload: string) {\n`);
  content += indent(`}\n`);
  content += `}\n`;
  content += `\n`;
  return content;
}

export function getActionOverviewType(content: string, actionClassNameBase: string) {
  content += `export type All${actionClassNameBase}Actions\n`;
  content += indent(`= ${actionClassNameBase}Start\n`);
  content += indent(`| ${actionClassNameBase}Success\n`);
  content += indent(`| ${actionClassNameBase}Error;\n`);
  return content;
}

export function getActionTypeNameBase(name: string, simpleName: string, operationPrefix: string) {
  return `${operationPrefix.toUpperCase()}_${name.toUpperCase()}_${simpleName.toUpperCase()}`;
}

export function getActionClassNameBase(name: string, simpleName: string, operationPrefix: string) {
  return `${operationPrefix}${name}${_.upperFirst(simpleName)}`;
}

export function getClassName(name: string, simpleName: string) {
  return `${name}${_.upperFirst(simpleName)}`;
}
