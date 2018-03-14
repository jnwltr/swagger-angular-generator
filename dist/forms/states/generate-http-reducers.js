"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils_1 = require("../../utils");
function GenerateHttpReducers(config, actionClassNameBase, formSubDirName) {
    // TODO implement initial state logic
    let content = '';
    content += getReducerImports();
    content += getStateInteface(actionClassNameBase);
    content += getInitialState(actionClassNameBase);
    content += getFeatureSelector(actionClassNameBase);
    content += getReducerDefinition(actionClassNameBase);
    const reducersFileName = path.join(formSubDirName, `states`, `reducers.ts`);
    utils_1.writeFile(reducersFileName, content, config.header);
}
exports.GenerateHttpReducers = GenerateHttpReducers;
function getReducerImports() {
    let res = `import {createFeatureSelector} from '@ngrx/store';\n`;
    res += `import * as actions from './actions';\n\n`;
    return res;
}
function getStateInteface(actionClassNameBase) {
    let res = `export interface ${actionClassNameBase}State {\n`;
    // TODO! check if store selection returns typed object
    res += utils_1.indent(`data: any;\n`);
    res += utils_1.indent(`loading: boolean;\n`);
    res += utils_1.indent(`error: string;\n`);
    res += `}\n\n`;
    return res;
}
function getInitialState(actionClassNameBase) {
    let res = `export const initial${actionClassNameBase}State: ${actionClassNameBase}State = {\n`;
    res += utils_1.indent(`data: {},\n`);
    res += utils_1.indent(`loading: false,\n`);
    res += utils_1.indent(`error: '',\n`);
    res += `};\n\n`;
    return res;
}
function getFeatureSelector(actionClassNameBase) {
    return `export const get${actionClassNameBase}StateSelector = ` +
        `createFeatureSelector<${actionClassNameBase}State>('${actionClassNameBase}');\n\n`;
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