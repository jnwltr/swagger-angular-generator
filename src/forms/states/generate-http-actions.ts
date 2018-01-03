import * as conf from '../../conf';
import * as path from 'path';
import {indent, writeFile} from '../../utils';
import {Config} from '../../generate';
import {ResponseDef} from '../../requests/requests.models';
import * as _ from 'lodash';

export function GenerateHttpActions(config: Config, name: string, dashedName: string, responseDef: ResponseDef,
                                    actionClassNameBase: string, actionTypeNameBase: string) {

  let content = '';
  content = getActionImports(content, name);
  content = getActionTypes(content, name, actionTypeNameBase);

  content = getActionStartDefinition(content, name, actionClassNameBase, actionTypeNameBase);
  content = getActionSuccessDefinition(content, actionClassNameBase, actionTypeNameBase, responseDef);
  content = getActionErrorDefinition(content, actionClassNameBase, actionTypeNameBase);

  content = getActionOverviewType(content, actionClassNameBase);

  const actionsFileName = path.join(config.dest, conf.formDir + `/${dashedName}/states`, `actions.ts`);
  writeFile(actionsFileName, content, config.header);
}

export function getActionImports(content: string, name: string) {
  content += `import {Action} from '@ngrx/store';\n`;
  content += `import {${name}Params} from '../../../controllers/${name}';\n`;
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

export function getActionStartDefinition(content: string, name: string, actionClassNameBase: string,
                                         actionTypeNameBase: string) {
  content += `export class ${actionClassNameBase}Start implements Action {\n`;
  content += indent(`readonly type = ${actionTypeNameBase}_START;\n`);
  content += indent(`constructor(public payload: ${name}Params) {\n`);
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
