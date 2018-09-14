import * as nodePath from 'path';

import {Config} from '../generate';
import {writeFile} from '../utils';

export function createFormArrayExtended(dest: string, config: Config) {
  const content =
    'import {AbstractControl, FormArray} from \'@angular/forms\';\n\n' +
    'type ControlFactory = () => AbstractControl;\n\n' +
    '/** Extends FormArray so it contains definitions of items for further creation */\n' +
    'export class FormArrayExtended extends FormArray {\n' +
    '  constructor(public createControl: ControlFactory, ...rest: any[]) {\n' +
    '    super([], ...rest);\n' +
    '  }\n\n' +
    '  setValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {\n' +
    '    while (value.length < this.controls.length) this.removeAt(this.length - 1);\n' +
    '    while (value.length > this.controls.length) this.push(this.createControl());\n' +
    '    super.setValue(value, options);\n' +
    '  }\n' +
    '}\n';

  const fileName = nodePath.join(dest, `formArrayExtended.ts`);
  writeFile(fileName, content, config.header);
}
