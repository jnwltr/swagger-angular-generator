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
  content += `import {${actionClassNameBase}Effects} from './states/effects';\n`;
  content += `import {${actionClassNameBase}Reducer} from './states/reducers';\n`;
  content += `import {selectorName} from './states/reducers';\n`;
  content += '\n';
  content += '@NgModule({\n';
  content += indent('imports: [\n');
  // TODO! use or remove
  // content += indent('FormsSharedModule,\n', 2);
  content += indent(`StoreModule.forFeature(selectorName, ${actionClassNameBase}Reducer),\n`, 2);
  content += indent(`EffectsModule.forFeature([${actionClassNameBase}Effects]),\n`, 2);
  content += indent('],\n');
  // TODO! use for forms or remove
  // content += indent('declarations: [\n');
  // if (!isGetMethod) {
  //   content += indent(`${className}Component,\n`, 2);
  // }
  // content += indent('],\n');
  content += indent('providers: [\n');
  content += indent(`${name}Service,\n`, 2);
  content += indent('],\n');
  content += '})\n';
  content += `export class ${className}Module {}\n`;

  const moduleFileName = path.join(formSubDirName, `${simpleName}.module.ts`);
  writeFile(moduleFileName, content, config.header);
}
