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
        // TODO! verify the idea behind this
        if ('formData' in paramGroups)
            _.merge(formParamGroups, paramGroups.formData);
        else if ('body' in paramGroups)
            _.merge(formParamGroups, paramGroups.body);
        if ('query' in paramGroups)
            _.merge(formParamGroups, paramGroups.query);
        const actionClassNameBase = generate_http_actions_1.getActionClassNameBase(simpleName);
        const className = generate_http_actions_1.getClassName(simpleName);
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
        const statesDirName = path.join(formSubDirName, 'states');
        utils_1.createDir(statesDirName);
        // actions.ts
        generate_http_actions_1.GenerateHttpActions(config, name, responseDef, actionClassNameBase, simpleName, formSubDirName, formParamGroups);
        // reducers.ts
        generate_http_reducers_1.GenerateHttpReducers(config, actionClassNameBase, formSubDirName);
        // effects.ts
        generate_http_effects_1.GenerateHttpEffects(config, name, simpleName, actionClassNameBase, formSubDirName, formParamGroups);
        // form-shared-module.ts
        shared_module_1.createSharedModule(config);
        // module.ts
        process_module_1.createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, isGetMethod);
    }
}
exports.createForms = createForms;
//# sourceMappingURL=generate-form-modules.js.map