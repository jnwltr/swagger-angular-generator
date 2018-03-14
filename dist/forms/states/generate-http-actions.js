"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const path = require("path");
const utils_1 = require("../../utils");
function GenerateHttpActions(config, name, responseDef, actionClassNameBase, simpleName, formSubDirName, paramGroups) {
    let content = '';
    content += getActionImports(name, simpleName, paramGroups, responseDef.type.startsWith('model.'));
    content += getActionTypes(simpleName);
    content += getActionStartDefinition(simpleName);
    content += getActionSuccessDefinition(responseDef);
    content += getActionErrorDefinition();
    content += getActionOverviewType(actionClassNameBase);
    const actionsFileName = path.join(formSubDirName, `states`, `actions.ts`);
    utils_1.writeFile(actionsFileName, content, config.header, 'ts', ['max-classes-per-file']);
}
exports.GenerateHttpActions = GenerateHttpActions;
function getActionImports(name, simpleName, paramGroups, importModels) {
    let res = `import {Action} from '@ngrx/store';\n`;
    if (paramGroups.length) {
        res += `import {${_.upperFirst(simpleName)}Params} from '../../../../controllers/${name}';\n`;
    }
    if (importModels)
        res += `import * as model from '../../../../model';\n`;
    res += `\n`;
    return res;
}
function getActionTypes(name) {
    let res = `export enum Actions {\n`;
    res += utils_1.indent([
        `START = '[${name}] Start',`,
        `SUCCESS = '[${name}] Success',`,
        `ERROR = '[${name}] Error',`,
    ]);
    res += `\n}\n\n`;
    return res;
}
function getActionStartDefinition(name) {
    let res = `export class Start implements Action {\n`;
    res += utils_1.indent(`readonly type = Actions.START;\n`);
    res += utils_1.indent(`constructor(public payload: ${_.upperFirst(name)}Params) {}\n`);
    res += `}\n`;
    res += `\n`;
    return res;
}
function getActionSuccessDefinition(response) {
    let res = `export class Success implements Action {\n`;
    res += utils_1.indent(`readonly type = Actions.SUCCESS;\n`);
    res += utils_1.indent(`constructor(public payload: ${response.type}) {}\n`);
    res += `}\n`;
    res += `\n`;
    return res;
}
function getActionErrorDefinition() {
    let res = `export class Error implements Action {\n`;
    res += utils_1.indent(`readonly type = Actions.ERROR;\n`);
    res += utils_1.indent(`constructor(public payload: string) {}\n`);
    res += `}\n`;
    res += `\n`;
    return res;
}
function getActionOverviewType(actionClassNameBase) {
    return `export type ${actionClassNameBase}Action = Start | Success | Error;\n`;
}
function getActionClassNameBase(name) {
    return getClassName(name);
}
exports.getActionClassNameBase = getActionClassNameBase;
function getClassName(name) {
    return _.upperFirst(name);
}
exports.getClassName = getClassName;
//# sourceMappingURL=generate-http-actions.js.map