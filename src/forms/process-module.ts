import * as path from 'path';
import {Config} from '../generate';
import {indent, writeFile} from '../utils';

export function createModule(config: Config, name: string, actionClassNameBase: string,
                             formSubDirName: string, simpleName: string, className: string, isGetMethod: boolean) {
  let content = `import {NgModule} from '@angular/core';\n`;
  content += `import {EffectsModule} from '@ngrx/effects';\n`;
  content += `import {StoreModule} from '@ngrx/store';\n`;
  content += '\n';
  content += `import {${name}Service} from '../../../controllers/${name}';\n`;
  content += `import {FormsSharedModule} from '../../forms-shared.module';\n`;
  content += `import {${actionClassNameBase}Effects} from './states/effects';\n`;
  content += `import {${actionClassNameBase}Reducer} from './states/reducers';\n`;
  content += '\n';
  if (!isGetMethod) {
    content += `import {${className}Component} from './${simpleName}.component';\n`;
    content += '\n';
  }
  content += '@NgModule({\n';
  content += indent('imports: [\n');
  content += indent('FormsSharedModule,\n', 2);
  content += indent(`StoreModule.forFeature('${actionClassNameBase}', ${actionClassNameBase}Reducer),\n`, 2);
  content += indent(`EffectsModule.forFeature([${actionClassNameBase}Effects]),\n`, 2);
  content += indent('],\n');
  content += indent('declarations: [\n');
  if (!isGetMethod) {
    content += indent(`${className}Component,\n`, 2);
  }
  content += indent('],\n');
  content += indent('providers: [\n');
  content += indent(`${name}Service,\n`, 2);
  content += indent('],\n');
  content += '})\n';
  content += `export class ${className}Module {\n`;
  content += '}\n';

  const moduleFileName = path.join(formSubDirName, `${simpleName}.module.ts`);
  writeFile(moduleFileName, content, config.header);
}
