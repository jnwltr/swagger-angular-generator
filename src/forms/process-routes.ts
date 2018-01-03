import {Config} from '../generate';
import * as path from 'path';
import * as conf from '../conf';
import {indent, writeFile} from '../utils';

export function createRoute(config: Config, name: string, dashedName: string) {
  let content = `import {Routes} from '@angular/router';\n`;
  content += `import {${name}Component} from './${dashedName}.component';\n`;
  content += '\n';
  content += 'export const routes: Routes = [\n';
  content += indent(`{path: '', component: ${name}Component, pathMatch: 'full'},\n`);
  content += '];\n';

  const moduleFileName = path.join(config.dest, conf.formDir + `/${dashedName}`, `${dashedName}.routes.ts`);
  writeFile(moduleFileName, content, config.header);
}
