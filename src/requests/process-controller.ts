/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';
import * as path from 'path';

import * as conf from '../conf';
import {ProcessedDefinition} from '../definitions';
import {createForms} from '../forms/generate-form-modules';
import {Config} from '../generate';
import {indent, writeFile} from '../utils';
import {processMethod} from './process-method';
import {processResponses} from './process-responses';
import {ControllerMethod, MethodOutput} from './requests.models';

/**
 * Creates and serializes class for api communication for controller
 * @param controllers list of methods of the controller
 * @param name
 */
export function processController(methods: ControllerMethod[], name: string, config: Config,
                                  definitions: ProcessedDefinition[]) {
  const filename = path.join(config.dest, conf.apiDir, `${name}.ts`);
  let usesGlobalType = false;

  // make simpleNames unique and process responses
  const simpleNames = _.map(methods, 'simpleName');
  methods.forEach(controller => {
    if (simpleNames.filter(n => n === controller.simpleName).length > 1) {
      const preserveCapitals = controller.operationId.replace(/([A-Z])/g, '-$1');
      controller.simpleName = _.lowerFirst(_.camelCase(preserveCapitals));
    }

    controller.responseDef = processResponses(controller.responses, controller.simpleName, config);
    usesGlobalType = usesGlobalType || controller.responseDef.usesGlobalType;
  });

  const processedMethods: MethodOutput[] = methods.map(m => processMethod(m, config.unwrapSingleParamMethods));
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
  content += indent('constructor(private http: HttpClient) {}');
  content += '\n';
  content += indent(_.map(processedMethods, 'methodDef').join('\n\n'));
  content += '\n}\n';

  if (conf.adHocExceptions.api[name]) {
    content = content.replace(conf.adHocExceptions.api[name][0],
                              conf.adHocExceptions.api[name][1]);
  }

  // controllers
  writeFile(filename, content, config.header);

  // forms
  if (config.generateStore) {
    createForms(config, name, processedMethods, definitions);
  }
}
