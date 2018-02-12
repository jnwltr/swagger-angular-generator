import * as _ from 'lodash';
import * as path from 'path';
import {Config} from '../../generate';
import {ResponseDef} from '../../requests/requests.models';
import {Parameter} from '../../types';
import {indent, writeFile} from '../../utils';

export function GenerateHttpActions(config: Config, name: string, responseDef: ResponseDef,
                                    actionClassNameBase: string, actionTypeNameBase: string, simpleName: string,
                                    formSubDirName: string, paramGroups: Parameter[]) {
  let content = '';
  content += getActionImports(name, simpleName, paramGroups);
  content += getActionTypes(name, actionTypeNameBase);
  content += getActionStartDefinition(simpleName, actionClassNameBase, actionTypeNameBase);
  content += getActionSuccessDefinition(actionClassNameBase, actionTypeNameBase, responseDef);
  content += getActionErrorDefinition(actionClassNameBase, actionTypeNameBase);
  content += getActionOverviewType(actionClassNameBase);

  const actionsFileName = path.join(formSubDirName, `states`, `actions.ts`);
  writeFile(actionsFileName, content, config.header, 'ts', ['max-classes-per-file']);
}

function getActionImports(name: string, simpleName: string, paramGroups: Parameter[]) {
  let res = `import {Action} from '@ngrx/store';\n`;
  if (paramGroups.length) {
    res += `import {${_.upperFirst(simpleName)}Params} from '../../../../controllers/${name}';\n`;
  }
  res += `import * as model from '../../../../model';\n`;
  res += `\n`;

  return res;
}

function getActionTypes(name: string, actionTypeNameBase: string) {
  let res = `export const ${actionTypeNameBase}_START = '[${name}] Load ${name}';\n`;
  res += `export const ${actionTypeNameBase}_SUCCESS = '[${name}] Load ${name} Success';\n`;
  res += `export const ${actionTypeNameBase}_ERROR = '[${name}] Load ${name} Error';\n`;
  res += `\n`;

  return res;
}

function getActionStartDefinition(simpleName: string, actionClassNameBase: string,
                                  actionTypeNameBase: string) {
  let res = `export class ${actionClassNameBase}Start implements Action {\n`;
  res += indent(`readonly type = ${actionTypeNameBase}_START;\n`);
  res += indent(`constructor(public payload: ${_.upperFirst(simpleName)}Params) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionSuccessDefinition(actionClassNameBase: string, actionTypeNameBase: string,
                                    response: ResponseDef) {
  let res = `export class ${actionClassNameBase}Success implements Action {\n`;
  res += indent(`readonly type = ${actionTypeNameBase}_SUCCESS;\n`);
  res += indent(`constructor(public payload: ${response.type}) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionErrorDefinition(actionClassNameBase: string, actionTypeNameBase: string) {
  let res = `export class ${actionClassNameBase}Error implements Action {\n`;
  res += indent(`readonly type = ${actionTypeNameBase}_ERROR;\n`);
  res += indent(`constructor(public payload: string) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionOverviewType(actionClassNameBase: string) {
  let res = `export type All${actionClassNameBase}Actions\n`;
  res += indent(`= ${actionClassNameBase}Start\n`);
  res += indent(`| ${actionClassNameBase}Success\n`);
  res += indent(`| ${actionClassNameBase}Error;\n`);

  return res;
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
