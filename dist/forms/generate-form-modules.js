"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForms = void 0;
const _ = require("lodash");
const path = require("path");
const conf = require("../conf");
const utils_1 = require("../utils");
// TODO! rename
const generate_form_service_1 = require("./generate-form-service");
const process_module_1 = require("./process-module");
const shared_module_1 = require("./shared-module");
const generate_http_actions_1 = require("./states/generate-http-actions");
const generate_http_effects_1 = require("./states/generate-http-effects");
const generate_http_reducers_1 = require("./states/generate-http-reducers");
function createForms(config, name, processedMethods, definitions) {
    const kebabName = _.kebabCase(name);
    const formBaseDir = path.join(config.dest, conf.storeDir);
    const formDirName = path.join(formBaseDir, `${kebabName}`);
    (0, utils_1.createDir)(formDirName);
    for (const processedMethod of processedMethods) {
        const paramGroups = processedMethod.paramGroups;
        const responseDef = processedMethod.responseDef;
        const simpleName = processedMethod.simpleName;
        const formSubDirName = path.join(formBaseDir, `${kebabName}`, simpleName);
        (0, utils_1.createDir)(formSubDirName);
        let formParams = [];
        Object.values(paramGroups).forEach(params => {
            formParams = formParams.concat(params);
        });
        const actionClassNameBase = (0, generate_http_actions_1.getActionClassNameBase)(simpleName);
        const className = (0, generate_http_actions_1.getClassName)(simpleName);
        const generateForms = formParams.length >= 1;
        if (generateForms) {
            // component.ts
            (0, generate_form_service_1.generateFormService)(config, name, formParams, definitions, simpleName, formSubDirName, className);
        }
        if (config.generateStore) {
            // states
            const statesDirName = path.join(formSubDirName, conf.stateDir);
            (0, utils_1.createDir)(statesDirName);
            // actions.ts
            (0, generate_http_actions_1.generateHttpActions)(config, name, responseDef, actionClassNameBase, simpleName, formSubDirName, formParams);
            // reducers.ts
            (0, generate_http_reducers_1.generateHttpReducers)(config, name, actionClassNameBase, formSubDirName, responseDef.type);
            // effects.ts
            (0, generate_http_effects_1.generateHttpEffects)(config, name, simpleName, actionClassNameBase, formSubDirName, formParams);
            // form-shared-module.ts
            (0, shared_module_1.createSharedModule)(config);
            // module.ts
            (0, process_module_1.createModule)(config, name, actionClassNameBase, formSubDirName, simpleName, className, generateForms);
        }
    }
}
exports.createForms = createForms;
//# sourceMappingURL=generate-form-modules.js.map