"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodePath = require("path");
const utils_1 = require("../utils");
function createFormArrayExtended(dest, config) {
    const content = 'import {AbstractControl, FormArray} from \'@angular/forms\';\n\n' +
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
    utils_1.writeFile(fileName, content, config.header);
}
exports.createFormArrayExtended = createFormArrayExtended;
//# sourceMappingURL=form-extensions.js.map