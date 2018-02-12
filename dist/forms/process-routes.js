"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils_1 = require("../utils");
function createRoute(config, formSubDirName, simpleName, className) {
    let content = `import {Routes} from '@angular/router';\n`;
    content += `import {${className}Component} from './${simpleName}.component';\n`;
    content += '\n';
    content += 'export const routes: Routes = [\n';
    content += utils_1.indent(`{path: '', component: ${className}Component, pathMatch: 'full'},\n`);
    content += '];\n';
    const moduleFileName = path.join(formSubDirName, `${simpleName}.routes.ts`);
    utils_1.writeFile(moduleFileName, content, config.header);
}
exports.createRoute = createRoute;
//# sourceMappingURL=process-routes.js.map