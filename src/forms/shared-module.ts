import * as path from 'path';
import * as conf from '../conf';
import {Config} from '../generate';
import {indent, writeFile} from '../utils';

export function createSharedModule(config: Config) {
  let content = '';
  content += `import {CommonModule} from '@angular/common';\n`;
  content += `import {NgModule} from '@angular/core';\n`;
  content += `import {ReactiveFormsModule} from '@angular/forms';\n`;
  content += '\n';
  content += '@NgModule({\n';

  content += indent('imports: [\n');
  content += indent('CommonModule,\n', 2);
  content += indent('ReactiveFormsModule,\n', 2);
  content += indent('],\n');

  content += indent('exports: [\n');
  content += indent('CommonModule,\n', 2);
  content += indent('ReactiveFormsModule,\n', 2);
  content += indent('],\n');

  content += '})\n';
  content += `export class FormsSharedModule {}\n`;

  const moduleFileName = path.join(config.dest, conf.storeDir, `forms-shared.module.ts`);
  writeFile(moduleFileName, content, config.header);
}
