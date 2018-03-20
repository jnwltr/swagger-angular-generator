import * as path from 'path';
import {Config} from '../generate';
import {indent, writeFile} from '../utils';

export function createModule(config: Config, name: string, actionClassNameBase: string,
                             formSubDirName: string, simpleName: string, className: string,
                             addForm: boolean) {
  let content = `import {NgModule} from '@angular/core';\n`;
  content += `import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';\n`;
  content += `import {StoreModule as NgrxStoreModule} from '@ngrx/store';\n`;
  content += '\n';
  content += `import {${name}Service} from '../../../controllers/${name}';\n`;

  // TODO! use or remove
  content += `import {FormsSharedModule} from '../../forms-shared.module';\n`;
  if (addForm) content += `import {${className}FormService} from './${simpleName}.service';\n`;
  content += `\n`;

  content += `import {${actionClassNameBase}Effects} from './states/effects';\n`;
  content += `import {${actionClassNameBase}Reducer} from './states/reducers';\n`;
  content += `import {selectorName} from './states/reducers';\n`;
  content += '\n';
  content += '@NgModule({\n';
  content += indent('imports: [\n');

  // TODO! use or remove
  content += indent('FormsSharedModule,\n', 2);

  content += indent(`NgrxStoreModule.forFeature(selectorName, ${actionClassNameBase}Reducer),\n`, 2);
  content += indent(`NgrxEffectsModule.forFeature([${actionClassNameBase}Effects]),\n`, 2);
  content += indent('],\n');

  const providers = [`${name}Service,`];
  if (addForm) providers.push(`${className}FormService,`);
  content += indent('providers: [\n');
  content += indent(providers, 2);
  content += '\n';
  content += indent('],\n');
  content += '})\n';
  content += `export class ${className}Module {}\n`;

  const moduleFileName = path.join(formSubDirName, `${simpleName}.module.ts`);
  writeFile(moduleFileName, content, config.header);
}
