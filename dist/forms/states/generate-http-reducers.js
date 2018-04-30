"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const conf_1 = require("../../conf");
const utils_1 = require("../../utils");
function generateHttpReducers(config, actionClassNameBase, formSubDirName, responseType) {
    let content = '';
    content += getReducerImports(responseType.startsWith('__model.'));
    content += getStateInteface(actionClassNameBase, responseType);
    content += getInitialState(actionClassNameBase);
    content += getFeatureSelector(actionClassNameBase);
    content += getReducerDefinition(actionClassNameBase);
    const reducersFileName = path.join(formSubDirName, conf_1.stateDir, `reducers.ts`);
    utils_1.writeFile(reducersFileName, content, config.header);
}
exports.generateHttpReducers = generateHttpReducers;
function getReducerImports(usesModels) {
    let res = `import {createFeatureSelector} from '@ngrx/store';\n\n`;
    if (usesModels)
        res += `import * as __model from '../../../../model';\n`;
    res += `import * as actions from './actions';\n\n`;
    return res;
}
function getStateInteface(actionClassNameBase, type) {
    let res = `export interface ${actionClassNameBase}State {\n`;
    res += utils_1.indent(`data: ${type};\n`);
    res += utils_1.indent(`loading: boolean;\n`);
    res += utils_1.indent(`error: string;\n`);
    res += `}\n\n`;
    return res;
}
function getInitialState(actionClassNameBase) {
    let res = `export const initial${actionClassNameBase}State: ${actionClassNameBase}State = {\n`;
    res += utils_1.indent(`data: null,\n`);
    res += utils_1.indent(`loading: false,\n`);
    res += utils_1.indent(`error: null,\n`);
    res += `};\n\n`;
    return res;
}
function getFeatureSelector(actionClassNameBase) {
    let res = `export const selectorName = '${actionClassNameBase}';\n`;
    res += `export const get${actionClassNameBase}StateSelector = ` +
        `createFeatureSelector<${actionClassNameBase}State>(selectorName);\n\n`;
    return res;
}
function getReducerDefinition(actionClassNameBase) {
    let res = `export function ${actionClassNameBase}Reducer(\n`;
    res += utils_1.indent(`state: ${actionClassNameBase}State = initial${actionClassNameBase}State,\n`);
    res += utils_1.indent(`action: actions.${actionClassNameBase}Action): ${actionClassNameBase}State {\n\n`);
    res += utils_1.indent(`switch (action.type) {\n`);
    res += utils_1.indent([
        'case actions.Actions.START: return {...state, loading: true, error: null};',
        'case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};',
        'case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};',
        'default: return state;',
    ], 2);
    res += utils_1.indent(`\n}\n`);
    res += `}\n`;
    return res;
}
//# sourceMappingURL=generate-http-reducers.js.map