import {Config} from '../generate';
import * as path from 'path';
import * as conf from '../conf';
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
  content += indent(indent('CommonModule,\n'));
  content += indent(indent('ReactiveFormsModule,\n'));
  content += indent(indent('FlexLayoutModule,\n'));

  content += indent(indent('MatButtonModule,\n'));
  content += indent(indent('MatButtonToggleModule,\n'));
  content += indent(indent('MatCardModule,\n'));
  content += indent(indent('MatCheckboxModule,\n'));
  content += indent(indent('MatChipsModule,\n'));
  content += indent(indent('MatDatepickerModule,\n'));
  content += indent(indent('MatGridListModule,\n'));
  content += indent(indent('MatIconModule,\n'));
  content += indent(indent('MatInputModule,\n'));
  content += indent(indent('MatListModule,\n'));
  content += indent(indent('MatMenuModule,\n'));
  content += indent(indent('MatNativeDateModule,\n'));
  content += indent(indent('MatProgressBarModule,\n'));
  content += indent(indent('MatProgressSpinnerModule,\n'));
  content += indent(indent('MatRadioModule,\n'));
  content += indent(indent('MatSelectModule,\n'));

  content += indent('],\n');

  content += indent('exports: [\n');
  content += indent(indent('CommonModule,\n'));
  content += indent(indent('ReactiveFormsModule,\n'));
  content += indent(indent('FlexLayoutModule,\n'));

  content += indent(indent('MatButtonModule,\n'));
  content += indent(indent('MatButtonToggleModule,\n'));
  content += indent(indent('MatCardModule,\n'));
  content += indent(indent('MatCheckboxModule,\n'));
  content += indent(indent('MatChipsModule,\n'));
  content += indent(indent('MatDatepickerModule,\n'));
  content += indent(indent('MatGridListModule,\n'));
  content += indent(indent('MatIconModule,\n'));
  content += indent(indent('MatInputModule,\n'));
  content += indent(indent('MatListModule,\n'));
  content += indent(indent('MatMenuModule,\n'));
  content += indent(indent('MatNativeDateModule,\n'));
  content += indent(indent('MatProgressBarModule,\n'));
  content += indent(indent('MatProgressSpinnerModule,\n'));
  content += indent(indent('MatRadioModule,\n'));
  content += indent(indent('MatSelectModule,\n'));
  content += indent('],\n');

  content += '})\n';
  content += `export class FormsSharedModule {}\n`;

  const moduleFileName = path.join(config.dest, conf.formDir, `forms-shared.module.ts`);
  writeFile(moduleFileName, content, config.header);
}
