import {Config} from '../generate';
import * as path from 'path';
import {indent, writeFile} from '../utils';

export function createRoute(config: Config, formSubDirName: string, simpleName: string, className: string) {
  let content = `import {Routes} from '@angular/router';\n`;
  content += `import {${className}Component} from './${simpleName}.component';\n`;
  content += '\n';
  content += 'export const routes: Routes = [\n';
  content += indent(`{path: '', component: ${className}Component, pathMatch: 'full'},\n`);
  content += '];\n';

  const moduleFileName = path.join(formSubDirName, `${simpleName}.routes.ts`);
  writeFile(moduleFileName, content, config.header);
}
