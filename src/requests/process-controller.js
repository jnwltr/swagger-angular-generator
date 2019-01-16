"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const path = require("path");
const conf = require("../conf");
const generate_form_modules_1 = require("../forms/generate-form-modules");
const utils_1 = require("../utils");
const process_method_1 = require("./process-method");
const process_responses_1 = require("./process-responses");
/**
 * Creates and serializes class for api communication for controller
 * @param controllers list of methods of the controller
 * @param name
 */
function processController(methods, name, config, definitions) {
    const filename = path.join(config.dest, conf.apiDir, `${name}.ts`);
    let usesGlobalType = false;
    // make simpleNames unique and process responses
    const simpleNames = _.map(methods, 'simpleName');
    methods.forEach(controller => {
        if (simpleNames.filter(n => n === controller.simpleName).length > 1) {
            const preserveCapitals = controller.operationId.replace(/([A-Z])/g, '-$1');
            controller.simpleName = _.lowerFirst(_.camelCase(preserveCapitals));
        }
        controller.responseDef = process_responses_1.processResponses(controller.responses, controller.simpleName, config);
        usesGlobalType = usesGlobalType || controller.responseDef.usesGlobalType;
    });
    const processedMethods = methods.map(m => process_method_1.processMethod(m, config.unwrapSingleParamMethods));
    usesGlobalType = usesGlobalType || processedMethods.some(c => c.usesGlobalType);
    let content = '';
    const angularCommonHttp = ['HttpClient'];
    if (processedMethods.some(c => 'header' in c.paramGroups)) {
        angularCommonHttp.push('HttpHeaders');
    }
    if (processedMethods.some(c => 'query' in c.paramGroups)) {
        angularCommonHttp.push('HttpParams');
    }
    angularCommonHttp.push('HttpResponse');
    content += `import {${angularCommonHttp.join(', ')}} from \'@angular/common/http\';\n`;
    content += 'import {Injectable} from \'@angular/core\';\n';
    content += 'import {Observable} from \'rxjs\';\n\n';
    if (usesGlobalType) {
        content += `import * as __${conf.modelFile} from \'../${conf.modelFile}\';\n\n`;
    }
    const interfaceDef = _.map(processedMethods, 'interfaceDef').filter(Boolean).join('\n');
    if (interfaceDef) {
        content += interfaceDef;
        content += '\n';
    }
    content += `@Injectable()\n`;
    content += `export class ${name}Service {\n`;
    content += utils_1.indent('constructor(private http: HttpClient) {}');
    content += '\n';
    content += utils_1.indent(_.map(processedMethods, 'methodDef').join('\n\n'));
    content += '\n}\n';
    if (conf.adHocExceptions.api[name]) {
        content = content.replace(conf.adHocExceptions.api[name][0], conf.adHocExceptions.api[name][1]);
    }
    // controllers
    utils_1.writeFile(filename, content, config.header);
    // forms
    if (config.generateStore) {
        generate_form_modules_1.createForms(config, name, processedMethods, definitions);
    }
}
exports.processController = processController;
//# sourceMappingURL=process-controller.js.map