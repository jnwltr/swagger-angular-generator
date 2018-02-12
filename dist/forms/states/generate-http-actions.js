"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const path = require("path");
const utils_1 = require("../../utils");
function GenerateHttpActions(config, name, responseDef, actionClassNameBase, actionTypeNameBase, simpleName, formSubDirName, paramGroups) {
    let content = '';
    content += getActionImports(name, simpleName, paramGroups);
    content += getActionTypes(name, actionTypeNameBase);
    content += getActionStartDefinition(simpleName, actionClassNameBase, actionTypeNameBase);
    content += getActionSuccessDefinition(actionClassNameBase, actionTypeNameBase, responseDef);
    content += getActionErrorDefinition(actionClassNameBase, actionTypeNameBase);
    content += getActionOverviewType(actionClassNameBase);
    const actionsFileName = path.join(formSubDirName, `states`, `actions.ts`);
    utils_1.writeFile(actionsFileName, content, config.header, 'ts', ['max-classes-per-file']);
}
exports.GenerateHttpActions = GenerateHttpActions;
function getActionImports(name, simpleName, paramGroups) {
    let res = `import {Action} from '@ngrx/store';\n`;
    if (paramGroups.length) {
        res += `import {${_.upperFirst(simpleName)}Params} from '../../../../controllers/${name}';\n`;
    }
    res += `import * as model from '../../../../model';\n`;
    res += `\n`;
    return res;
}
function getActionTypes(name, actionTypeNameBase) {
    let res = `export const ${actionTypeNameBase}_START = '[${name}] Load ${name}';\n`;
    res += `export const ${actionTypeNameBase}_SUCCESS = '[${name}] Load ${name} Success';\n`;
    res += `export const ${actionTypeNameBase}_ERROR = '[${name}] Load ${name} Error';\n`;
    res += `\n`;
    return res;
}
function getActionStartDefinition(simpleName, actionClassNameBase, actionTypeNameBase) {
    let res = `export class ${actionClassNameBase}Start implements Action {\n`;
    res += utils_1.indent(`readonly type = ${actionTypeNameBase}_START;\n`);
    res += utils_1.indent(`constructor(public payload: ${_.upperFirst(simpleName)}Params) {}\n`);
    res += `}\n`;
    res += `\n`;
    return res;
}
function getActionSuccessDefinition(actionClassNameBase, actionTypeNameBase, response) {
    let res = `export class ${actionClassNameBase}Success implements Action {\n`;
    res += utils_1.indent(`readonly type = ${actionTypeNameBase}_SUCCESS;\n`);
    res += utils_1.indent(`constructor(public payload: ${response.type}) {}\n`);
    res += `}\n`;
    res += `\n`;
    return res;
}
function getActionErrorDefinition(actionClassNameBase, actionTypeNameBase) {
    let res = `export class ${actionClassNameBase}Error implements Action {\n`;
    res += utils_1.indent(`readonly type = ${actionTypeNameBase}_ERROR;\n`);
    res += utils_1.indent(`constructor(public payload: string) {}\n`);
    res += `}\n`;
    res += `\n`;
    return res;
}
function getActionOverviewType(actionClassNameBase) {
    let res = `export type All${actionClassNameBase}Actions\n`;
    res += utils_1.indent(`= ${actionClassNameBase}Start\n`);
    res += utils_1.indent(`| ${actionClassNameBase}Success\n`);
    res += utils_1.indent(`| ${actionClassNameBase}Error;\n`);
    return res;
}
function getActionTypeNameBase(name, simpleName, operationPrefix) {
    return `${operationPrefix.toUpperCase()}_${name.toUpperCase()}_${simpleName.toUpperCase()}`;
}
exports.getActionTypeNameBase = getActionTypeNameBase;
function getActionClassNameBase(name, simpleName, operationPrefix) {
    return `${operationPrefix}${name}${_.upperFirst(simpleName)}`;
}
exports.getActionClassNameBase = getActionClassNameBase;
function getClassName(name, simpleName) {
    return `${name}${_.upperFirst(simpleName)}`;
}
exports.getClassName = getClassName;
//# sourceMappingURL=generate-http-actions.js.map