import * as _ from 'lodash';
import * as path from 'path';

import {stateDir} from '../../conf';
import {Config} from '../../generate';
import {ResponseDef} from '../../requests/requests.models';
import {Parameter} from '../../types';
import {indent, writeFile} from '../../utils';

export function generateHttpActions(config: Config, name: string, responseDef: ResponseDef,
                                    actionClassNameBase: string, simpleName: string,
                                    formSubDirName: string, paramGroups: Parameter[]) {
  let content = '';
  const hasParams = paramGroups.length >= 1;
  content += getActionImports(name, simpleName, hasParams, responseDef.type.startsWith('__model.'));
  content += getActionTypes(name, simpleName);
  content += getActionStartDefinition(simpleName, hasParams);
  content += getActionSuccessDefinition(responseDef);
  content += getActionErrorDefinition();
  content += getActionOverviewType(actionClassNameBase);

  const actionsFileName = path.join(formSubDirName, stateDir, `actions.ts`);
  writeFile(actionsFileName, content, config.header, 'ts', ['max-line-length', 'max-classes-per-file']);
}

function getActionImports(name: string, simpleName: string, hasParams: boolean,
                          importModels: boolean) {
  let res = `import {HttpErrorResponse, HttpResponse} from '@angular/common/http';\n`;
  res += `import {Action} from '@ngrx/store';\n`;

  if (hasParams) {
    res += `import {${_.upperFirst(simpleName)}Params} from '../../../../controllers/${name}';\n`;
  }
  if (importModels) res += `import * as __model from '../../../../model';\n`;
  res += `\n`;

  return res;
}

function getActionTypes(controllerName: string, methodName: string) {
  let res = `export enum Actions {\n`;
  res += indent([
    `START = '[${controllerName} ${methodName}] Start',`,
    `SUCCESS = '[${controllerName} ${methodName}] Success',`,
    `ERROR = '[${controllerName} ${methodName}] Error',`,
  ]);
  res += `\n}\n\n`;

  return res;
}

function getActionStartDefinition(name: string, hasParams: boolean) {
  let res = `export class Start implements Action {\n`;
  res += indent(`readonly type = Actions.START;\n`);
  const params = hasParams ? `public payload: ${ _.upperFirst(name) }Params` : '';
  res += indent(`constructor(${params}) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionSuccessDefinition(response: ResponseDef) {
  let res = `export class Success implements Action {\n`;
  res += indent(`readonly type = Actions.SUCCESS;\n`);
  res += indent(`constructor(public payload: HttpResponse<${response.type}>) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionErrorDefinition() {
  let res = `export class Error implements Action {\n`;
  res += indent(`readonly type = Actions.ERROR;\n`);
  res += indent(`constructor(public payload: HttpErrorResponse) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionOverviewType(actionClassNameBase: string) {
  return `export type ${actionClassNameBase}Action = Start | Success | Error;\n`;
}

export function getActionClassNameBase(name: string) {
  return getClassName(name);
}

export function getClassName(name: string) {
  return _.upperFirst(name);
}
