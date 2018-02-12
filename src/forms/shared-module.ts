import * as path from 'path';
import * as conf from '../conf';
import {Config} from '../generate';
import {indent, writeFile} from '../utils';

export function createSharedModule(config: Config) {
  let content = '';
  content += `import {NgModule} from '@angular/core';\n`;
  content += `import {CommonModule} from '@angular/common';\n`;
  content += `import {FlexLayoutModule} from '@angular/flex-layout';\n`;
  content += `import {ReactiveFormsModule} from '@angular/forms';\n`;
  content += 'import {\n';
  content += indent('MatButtonModule,\n');
  content += indent('MatButtonToggleModule,\n');
  content += indent('MatCardModule,\n');
  content += indent('MatCheckboxModule,\n');
  content += indent('MatChipsModule,\n');
  content += indent('MatDatepickerModule,\n');
  content += indent('MatGridListModule,\n');
  content += indent('MatIconModule,\n');
  content += indent('MatInputModule,\n');
  content += indent('MatListModule,\n');
  content += indent('MatMenuModule,\n');
  content += indent('MatNativeDateModule,\n');
  content += indent('MatProgressBarModule,\n');
  content += indent('MatProgressSpinnerModule,\n');
  content += indent('MatRadioModule,\n');
  content += indent('MatSelectModule,\n');
  content += `} from '@angular/material';\n`;
  content += '\n';
  content += '@NgModule({\n';
  content += indent('imports: [\n');
  content += indent('CommonModule,\n', 2);
  content += indent('ReactiveFormsModule,\n', 2);
  content += indent('FlexLayoutModule,\n', 2);

  content += indent('MatButtonModule,\n', 2);
  content += indent('MatButtonToggleModule,\n', 2);
  content += indent('MatCardModule,\n', 2);
  content += indent('MatCheckboxModule,\n', 2);
  content += indent('MatChipsModule,\n', 2);
  content += indent('MatDatepickerModule,\n', 2);
  content += indent('MatGridListModule,\n', 2);
  content += indent('MatIconModule,\n', 2);
  content += indent('MatInputModule,\n', 2);
  content += indent('MatListModule,\n', 2);
  content += indent('MatMenuModule,\n', 2);
  content += indent('MatNativeDateModule,\n', 2);
  content += indent('MatProgressBarModule,\n', 2);
  content += indent('MatProgressSpinnerModule,\n', 2);
  content += indent('MatRadioModule,\n', 2);
  content += indent('MatSelectModule,\n', 2);

  content += indent('],\n');

  content += indent('exports: [\n');
  content += indent('CommonModule,\n', 2);
  content += indent('ReactiveFormsModule,\n', 2);
  content += indent('FlexLayoutModule,\n', 2);

  content += indent('MatButtonModule,\n', 2);
  content += indent('MatButtonToggleModule,\n', 2);
  content += indent('MatCardModule,\n', 2);
  content += indent('MatCheckboxModule,\n', 2);
  content += indent('MatChipsModule,\n', 2);
  content += indent('MatDatepickerModule,\n', 2);
  content += indent('MatGridListModule,\n', 2);
  content += indent('MatIconModule,\n', 2);
  content += indent('MatInputModule,\n', 2);
  content += indent('MatListModule,\n', 2);
  content += indent('MatMenuModule,\n', 2);
  content += indent('MatNativeDateModule,\n', 2);
  content += indent('MatProgressBarModule,\n', 2);
  content += indent('MatProgressSpinnerModule,\n', 2);
  content += indent('MatRadioModule,\n', 2);
  content += indent('MatSelectModule,\n', 2);
  content += indent('],\n');

  content += '})\n';
  content += `export class FormsSharedModule {}\n`;

  const moduleFileName = path.join(config.dest, conf.formDir, `forms-shared.module.ts`);
  writeFile(moduleFileName, content, config.header);
}
