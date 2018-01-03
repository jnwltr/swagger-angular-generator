"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils_1 = require("../utils");
function createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, addForm) {
    let content = `import {NgModule} from '@angular/core';\n`;
    content += `import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';\n`;
    content += `import {StoreModule as NgrxStoreModule} from '@ngrx/store';\n`;
    content += '\n';
    content += `import {${name}Service} from '../../../controllers/${name}';\n`;
    // TODO! use or remove
    content += `import {FormsSharedModule} from '../../forms-shared.module';\n`;
    if (addForm)
        content += `import {${className}FormService} from './${simpleName}.service';\n`;
    content += `\n`;
    content += `import {${actionClassNameBase}Effects} from './states/effects';\n`;
    content += `import {${actionClassNameBase}Reducer} from './states/reducers';\n`;
    content += `import {selectorName} from './states/reducers';\n`;
    content += '\n';
    content += '@NgModule({\n';
    content += utils_1.indent('imports: [\n');
    // TODO! use or remove
    content += utils_1.indent('FormsSharedModule,\n', 2);
    content += utils_1.indent(`NgrxStoreModule.forFeature(selectorName, ${actionClassNameBase}Reducer),\n`, 2);
    content += utils_1.indent(`NgrxEffectsModule.forFeature([${actionClassNameBase}Effects]),\n`, 2);
    content += utils_1.indent('],\n');
    const providers = [`${name}Service,`];
    if (addForm)
        providers.push(`${className}FormService,`);
    content += utils_1.indent('providers: [\n');
    content += utils_1.indent(providers, 2);
    content += '\n';
    content += utils_1.indent('],\n');
    content += '})\n';
    content += `export class ${className}Module {}\n`;
    const moduleFileName = path.join(formSubDirName, `${simpleName}.module.ts`);
    utils_1.writeFile(moduleFileName, content, config.header);
}
exports.createModule = createModule;
//# sourceMappingURL=process-module.js.map