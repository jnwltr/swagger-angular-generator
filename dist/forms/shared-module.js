"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const conf = require("../conf");
const utils_1 = require("../utils");
function createSharedModule(config) {
    let content = '';
    content += `import {CommonModule} from '@angular/common';\n`;
    content += `import {NgModule} from '@angular/core';\n`;
    content += `import {ReactiveFormsModule} from '@angular/forms';\n`;
    content += '\n';
    content += '@NgModule({\n';
    content += utils_1.indent('imports: [\n');
    content += utils_1.indent('CommonModule,\n', 2);
    content += utils_1.indent('ReactiveFormsModule,\n', 2);
    content += utils_1.indent('],\n');
    content += utils_1.indent('exports: [\n');
    content += utils_1.indent('CommonModule,\n', 2);
    content += utils_1.indent('ReactiveFormsModule,\n', 2);
    content += utils_1.indent('],\n');
    content += '})\n';
    content += `export class FormsSharedModule {}\n`;
    const moduleFileName = path.join(config.dest, conf.storeDir, `forms-shared.module.ts`);
    utils_1.writeFile(moduleFileName, content, config.header);
}
exports.createSharedModule = createSharedModule;
//# sourceMappingURL=shared-module.js.map