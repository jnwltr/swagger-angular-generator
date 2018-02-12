"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils_1 = require("../utils");
function createComponentTs(config, name, paramGroups, schemaObjectDefinitions, simpleName, formSubDirName, className) {
    const schemaObjectDefinitionsKeys = schemaObjectDefinitions.map(s => s.name.toLowerCase());
    let content = '';
    content += getImports(name);
    content += getComponent(simpleName);
    content += `export class ${className}Component implements OnInit {\n`;
    content += utils_1.indent(`${name}Form: FormGroup;\n`);
    const fieldDefinition = getFieldDefinition(paramGroups, schemaObjectDefinitionsKeys, schemaObjectDefinitions);
    content += fieldDefinition.content + '\n';
    content += getConstructor(name);
    content += getNgOnInit(fieldDefinition, name);
    content += getFormSubmitFunction(name, simpleName, paramGroups);
    content += '}\n';
    const componentHTMLFileName = path.join(formSubDirName, `${simpleName}.component.ts`);
    utils_1.writeFile(componentHTMLFileName, content, config.header);
}
exports.createComponentTs = createComponentTs;
function getImports(name) {
    let res = 'import {Component, OnInit} from \'@angular/core\';\n';
    res += 'import {FormBuilder, FormControl, FormGroup, Validators} from \'@angular/forms\';\n';
    res += `import {${name}Service} from '../../../controllers/${name}';\n`;
    res += '\n';
    return res;
}
function getComponent(simpleName) {
    let res = '@Component({\n';
    res += utils_1.indent(`selector: '${simpleName}',\n`);
    res += utils_1.indent(`templateUrl: './${simpleName}.component.html',\n`);
    res += '})\n';
    res += '\n';
    return res;
}
function getFieldDefinition(paramGroups, schemaObjectDefinitionsKeys, schemaObjectDefinitions) {
    const paramsArray = [];
    let content = '';
    // checkbox, select or input
    for (const param of paramGroups) {
        if (schemaObjectDefinitionsKeys.includes(param.name.toLowerCase())) {
            const objDef = schemaObjectDefinitions.find(obj => obj.name.toLowerCase() === param.name.toLowerCase());
            const properties = objDef.def.properties;
            Object.entries(properties).forEach(([key, value]) => {
                const validators = getValidators(value);
                if (objDef.def.required && objDef.def.required.includes(key)) {
                    validators.push('Validators.required');
                }
                content += utils_1.indent(`${key} = new FormControl('', [${validators.join(', ')}]);\n`);
                paramsArray.push(key);
            });
        }
        else {
            const validators = getValidators(param);
            if (param.required)
                validators.push('Validators.required');
            content += utils_1.indent(`${param.name} = new FormControl('', [${validators.join(', ')}]);\n`);
            paramsArray.push(param.name);
        }
    }
    return { content, paramsArray };
}
function getValidators(param) {
    const validators = [];
    if (param.format && param.format === 'email')
        validators.push('Validators.email');
    if (param.maxLength)
        validators.push(`Validators.maxLength(${param.maxLength})`);
    if (param.minLength)
        validators.push(`Validators.minLength(${param.minLength})`);
    if (param.pattern)
        validators.push(`Validators.pattern('${param.pattern})`);
    return validators;
}
function getConstructor(name) {
    let res = utils_1.indent('constructor(\n');
    res += utils_1.indent('private formBuilder: FormBuilder,\n', 2);
    res += utils_1.indent(`private ${name.toLowerCase()}Service: ${name}Service,\n`, 2);
    res += utils_1.indent(') {}\n');
    res += '\n';
    return res;
}
function getNgOnInit(fieldDefinition, name) {
    let res = utils_1.indent('ngOnInit() {\n');
    res += utils_1.indent(`this.${name}Form = this.formBuilder.group({\n`, 2);
    for (const pa of fieldDefinition.paramsArray) {
        res += utils_1.indent(`${pa}: this.${pa},\n`, 3);
    }
    res += utils_1.indent(`}, {updateOn: 'change'});\n`, 2);
    res += utils_1.indent('}\n');
    res += '\n';
    return res;
}
function getFormSubmitFunction(name, simpleName, paramGroups) {
    let res = utils_1.indent(`${name.toLowerCase()}() {\n`);
    res += utils_1.indent(`this.${name.toLowerCase()}Service.${simpleName}(${getSubmitFnParameters(name, paramGroups)});\n`, 2);
    res += utils_1.indent('}\n');
    return res;
}
function getSubmitFnParameters(name, paramGroups) {
    if (paramGroups.length)
        return `this.${name}Form.value`;
    return '';
}
//# sourceMappingURL=process-ts-component.js.map