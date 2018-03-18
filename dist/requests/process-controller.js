"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const path = require("path");
const conf = require("../conf");
const utils_1 = require("../utils");
const process_method_1 = require("./process-method");
const process_responses_1 = require("./process-responses");
/**
 * Creates and serializes class for api communication for controller
 * @param controllers list of methods of the controller
 * @param name
 */
function processController(methods, name, config, baseUrl) {
    const filename = path.join(config.dest, conf.apiDir, `${name}.ts`);
    let usesGlobalType = false;
    // make simpleNames unique and process responses
    const simpleNames = _.map(methods, 'simpleName');
    methods.forEach(controller => {
        if (simpleNames.filter(n => n === controller.simpleName).length > 1) {
            const preserveCapitals = controller.operationId.replace(/([A-Z])/g, '-$1');
            controller.simpleName = _.lowerFirst(_.camelCase(preserveCapitals));
        }
        controller.responseDef = process_responses_1.processResponses(controller.responses, controller.simpleName);
        usesGlobalType = usesGlobalType || controller.responseDef.usesGlobalType;
    });
    const processedMethods = methods.map(process_method_1.processMethod);
    usesGlobalType = usesGlobalType || processedMethods.some(c => c.usesGlobalType);
    let content = '';
    const angularCommonHttp = ['HttpClient'];
    if (processedMethods.some(c => c.usesQueryParams)) {
        angularCommonHttp.push('HttpParams');
    }
    content += `import {${angularCommonHttp.join(', ')}} from \'@angular/common/http\';\n`;
    content += 'import {Inject, Injectable, Optional} from \'@angular/core\';\n';
    content += 'import {Observable} from \'rxjs/Observable\';\n\n';
    content += `import {BASE_URL} from '../${conf.modelFile}';\n`;
    if (usesGlobalType) {
        content += `import * as ${conf.modelFile} from \'../${conf.modelFile}\';\n\n`;
    }
    const interfaceDef = _.map(processedMethods, 'interfaceDef').filter(Boolean).join('\n');
    if (interfaceDef) {
        content += interfaceDef;
        content += '\n';
    }
    content += `@Injectable()
  export class ${name}Service {
    private baseUrl = '${baseUrl}';
    constructor(private http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl: string) {
      if (baseUrl) this.baseUrl = baseUrl;
    }`;
    content += utils_1.indent(_.map(processedMethods, 'methodDef').join('\n\n'));
    content += '\n}\n';
    if (conf.adHocExceptions.api[name]) {
        content = content.replace(conf.adHocExceptions.api[name][0], conf.adHocExceptions.api[name][1]);
    }
    utils_1.writeFile(filename, content, config.header);
}
exports.processController = processController;
//# sourceMappingURL=process-controller.js.map