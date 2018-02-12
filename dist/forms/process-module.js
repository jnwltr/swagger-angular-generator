"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils_1 = require("../utils");
function createModule(config, name, actionClassNameBase, formSubDirName, simpleName, className, isGetMethod) {
    let content = `import {NgModule} from '@angular/core';\n`;
    content += `import {FormsSharedModule} from '../../forms-shared.module';\n`;
    if (!isGetMethod) {
        content += `import {RouterModule} from '@angular/router';\n`;
        content += `import {routes} from './${simpleName}.routes';\n`;
        content += `import {${className}Component} from './${simpleName}.component';\n`;
    }
    content += `import {${name}Service} from '../../../controllers/${name}';\n`;
    content += `import {EffectsModule} from '@ngrx/effects';\n`;
    content += `import {StoreModule} from '@ngrx/store';\n`;
    content += `import {${actionClassNameBase}Reducer} from './states/reducers';\n`;
    content += `import {${actionClassNameBase}Effects} from './states/effects';\n`;
    content += '\n';
    content += '@NgModule({\n';
    content += utils_1.indent('imports: [\n');
    content += utils_1.indent('FormsSharedModule,\n', 2);
    if (!isGetMethod) {
        content += utils_1.indent('RouterModule.forChild(routes),\n', 2);
    }
    content += utils_1.indent(`StoreModule.forFeature('${actionClassNameBase}', ${actionClassNameBase}Reducer),\n`, 2);
    content += utils_1.indent(`EffectsModule.forFeature([${actionClassNameBase}Effects]),\n`, 2);
    content += utils_1.indent('],\n');
    content += utils_1.indent('declarations: [\n');
    if (!isGetMethod) {
        content += utils_1.indent(`${className}Component,\n`, 2);
    }
    content += utils_1.indent('],\n');
    content += utils_1.indent('providers: [\n');
    content += utils_1.indent(`${name}Service,\n`, 2);
    content += utils_1.indent('],\n');
    content += '})\n';
    content += `export class ${className}Module {\n`;
    content += '}\n';
    const moduleFileName = path.join(formSubDirName, `${simpleName}.module.ts`);
    utils_1.writeFile(moduleFileName, content, config.header);
}
exports.createModule = createModule;
//# sourceMappingURL=process-module.js.map