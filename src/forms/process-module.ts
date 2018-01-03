import {Config} from '../generate';
import * as path from 'path';
import * as conf from '../conf';
import {indent, writeFile} from '../utils';

export function createModule(config: Config, name: string, dashedName: string, actionClassNameBase: string) {
  let content = '';
  content += `import {NgModule} from '@angular/core';\n`;
  content += `import {FormsSharedModule} from '../forms-shared.module';\n`;
  content += `import {RouterModule} from '@angular/router';\n`;
  content += `import {routes} from './${dashedName}.routes';\n`;
  content += `import {${name}Component} from './${dashedName}.component';\n`;
  content += `import {${name}Service} from '../../controllers/${name}';\n`;
  content += `import {EffectsModule} from '@ngrx/effects';\n`;
  content += `import {StoreModule} from '@ngrx/store';\n`;
  content += `import {${actionClassNameBase}Reducer} from './states/reducers';\n`;
  content += `import {${actionClassNameBase}Effects} from './states/effects';\n`;
  content += '\n';
  content += '@NgModule({\n';
  content += indent('imports: [\n');
  content += indent(indent('FormsSharedModule,\n'));
  content += indent(indent('RouterModule.forChild(routes),\n'));
  content += indent(indent(`StoreModule.forFeature('${actionClassNameBase}', ${actionClassNameBase}Reducer),\n`));
  content += indent(indent(`EffectsModule.forFeature([${actionClassNameBase}Effects]),\n`));
  content += indent('],\n');
  content += indent('declarations: [\n');
  content += indent(indent(`${name}Component,\n`));
  content += indent('],\n');
  content += indent('providers: [\n');
  content += indent(indent(`${name}Service,\n`));
  content += indent('],\n');
  content += '})\n';
  content += `export class ${name}Module {\n`;
  content += '}\n';

  const moduleFileName = path.join(config.dest, conf.formDir + `/${dashedName}`, `${dashedName}.module.ts`);
  writeFile(moduleFileName, content, config.header);
}
