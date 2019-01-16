"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const conf_1 = require("../../conf");
const utils_1 = require("../../utils");
function generateHttpReducers(config, name, actionClassNameBase, formSubDirName, responseType) {
    let content = '';
    content += getReducerImports(responseType.startsWith('__model.'));
    content += getStateInteface(actionClassNameBase, responseType);
    content += getInitialState(actionClassNameBase);
    content += getFeatureSelector(name, actionClassNameBase);
    content += getReducerDefinition(actionClassNameBase);
    const reducersFileName = path.join(formSubDirName, conf_1.stateDir, `reducers.ts`);
    utils_1.writeFile(reducersFileName, content, config.header);
}
exports.generateHttpReducers = generateHttpReducers;
function getReducerImports(usesModels) {
    let res = `import {createFeatureSelector} from '@ngrx/store';\n\n`;
    res += `import {HttpErrorResponse, HttpResponse} from '@angular/common/http';\n`;
    if (usesModels)
        res += `import * as __model from '../../../../model';\n`;
    res += `import * as actions from './actions';\n\n`;
    return res;
}
function getStateInteface(actionClassNameBase, type) {
    let res = `export interface ${actionClassNameBase}State {\n`;
    res += utils_1.indent(`data: ${type} | null;\n`);
    res += utils_1.indent(`loading: boolean;\n`);
    res += utils_1.indent(`error: HttpErrorResponse | null;\n`);
    res += utils_1.indent(`res: HttpResponse<${type}> | null;\n`);
    res += `}\n\n`;
    return res;
}
function getInitialState(actionClassNameBase) {
    let res = `export const initial${actionClassNameBase}State: ${actionClassNameBase}State = {\n`;
    res += utils_1.indent(`data: null,\n`);
    res += utils_1.indent(`loading: false,\n`);
    res += utils_1.indent(`error: null,\n`);
    res += utils_1.indent(`res: null,\n`);
    res += `};\n\n`;
    return res;
}
function getFeatureSelector(name, actionClassNameBase) {
    let res = `export const selectorName = '${name}_${actionClassNameBase}';\n`;
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
        'case actions.Actions.SUCCESS: return {\n' +
            utils_1.indent('...state,\ndata: action.payload.body,\nres: action.payload,\nloading: false,\n') +
            '};',
        'case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};',
        'default: return state;',
    ], 2);
    res += utils_1.indent(`\n}\n`);
    res += `}\n`;
    return res;
}
//# sourceMappingURL=generate-http-reducers.js.map