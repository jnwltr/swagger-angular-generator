"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const path = require("path");
const conf = require("../conf");
const utils_1 = require("../utils");
const process_html_component_1 = require("./process-html-component");
const process_module_1 = require("./process-module");
const process_routes_1 = require("./process-routes");
const process_ts_component_1 = require("./process-ts-component");
const shared_module_1 = require("./shared-module");
const generate_http_actions_1 = require("./states/generate-http-actions");
const generate_http_effects_1 = require("./states/generate-http-effects");
const generate_http_reducers_1 = require("./states/generate-http-reducers");
const shared_states_1 = require("./states/shared-states");
function createForms(config, name, processedMethods, schemaObjectDefinitions) {
    const dashedName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const formBaseDirName = path.join(config.dest, conf.formDir);
    utils_1.createDir(formBaseDirName);
    const formDirName = path.join(config.dest, conf.formDir, `${dashedName}`);
    utils_1.createDir(formDirName);
    for (const processedMethod of processedMethods) {
        const paramGroups = processedMethod.paramGroups;
        const responseDef = processedMethod.responseDef;
        const simpleName = processedMethod.simpleName;
        const methodName = processedMethod.methodName;
        let isGetMethod = true;
        const formSubDirName = path.join(config.dest, conf.formDir, `${dashedName}`, simpleName);
        utils_1.createDir(formSubDirName);
        const formParamGroups = [];
        if ('body' in paramGroups)
            _.merge(formParamGroups, paramGroups.body);
        if ('formData' in paramGroups)
            _.merge(formParamGroups, paramGroups.formData);
        const operationPrefix = shared_states_1.getStateOperationPrefix(methodName);
        const actionClassNameBase = generate_http_actions_1.getActionClassNameBase(name, simpleName, operationPrefix);
        const actionTypeNameBase = generate_http_actions_1.getActionTypeNameBase(name, simpleName, operationPrefix);
        const className = generate_http_actions_1.getClassName(name, simpleName);
        if (['put', 'patch', 'post'].indexOf(methodName) > -1) {
            isGetMethod = false;
            // component.ts
            process_ts_component_1.createComponentTs(config, name, formParamGroups, schemaObjectDefinitions, simpleName, formSubDirName, className);
            // component.html
            process_html_component_1.createComponentHTML(config, name, formParamGroups, schemaObjectDefinitions, formSubDirName, simpleName);
            // routes.ts
            process_routes_1.createRoute(config, formSubDirName, simpleName, className);
        }
        // states
        const statesDirName = path.join(formSubDirName, `states`);
        utils_1.createDir(statesDirName);
        // actions.ts
        generate_http_actions_1.GenerateHttpActions(config, name, responseDef, actionClassNameBase, actionTypeNameBase, simpleName, formSubDirName, formParamGroups);
        // reducers.ts
        generate_http_reducers_1.GenerateHttpReducers(config, actionClassNameBase, actionTypeNameBase, formSubDirName);
        // effects.ts
        generate_http_effects_1.GenerateHttpEffects(config, name, simpleName, actionClassNameBase, actionTypeNameBase, formSubDirName, formParamGroups);
        // form-shared-module.ts
        shared_module_1.createSharedModule(config);
        // module.ts
        process_module_1.createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, isGetMethod);
    }
}
exports.createForms = createForms;
//# sourceMappingURL=generate-form-modules.js.map