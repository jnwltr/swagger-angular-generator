"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const path = require("path");
const common_1 = require("../common");
const conf_1 = require("../conf");
const utils_1 = require("../utils");
function createComponentTs(config, name, params, definitions, simpleName, formSubDirName, className) {
    let content = '';
    content += getImports(name);
    content += getComponent(simpleName);
    content += `export class ${className}Component implements OnInit {\n`;
    content += utils_1.indent(`${name}Form: FormGroup;\n`);
    const fieldDefinition = getFieldDefinition(params, definitions);
    // TODO! test
    const definitionsMap = _.groupBy(definitions, 'originalName');
    walkParamOrProp(params, definitionsMap);
    content += fieldDefinition.content + '\n';
    content += getConstructor(name);
    content += getNgOnInit(fieldDefinition.params, name);
    content += getFormSubmitFunction(name, simpleName, params);
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
function walkParamOrProp(definition, definitions) {
    // parameters
    if (Array.isArray(definition)) {
        definition.forEach(param => {
            const type = param.type;
            const ref = _.get(param, 'schema.$ref');
            const child = makeField(type, ref, definitions);
            if (child)
                walkParamOrProp(child, definitions);
        });
        // object definition
    }
    else {
        Object.entries(definition.def.properties).forEach(([paramName, param]) => {
            const type = param.type;
            const ref = param.$ref;
            const child = makeField(type, ref, definitions);
            if (child)
                walkParamOrProp(child, definitions);
        });
    }
}
function makeField(type, ref, definitions) {
    console.log(`type: ${type}, $ref: ${ref}`);
    if (type) {
        console.log(`primitive: ${type}`);
        return;
    }
    else {
        const refType = ref.replace(/^#\/definitions\//, '');
        console.log(`composite: ${definitions[refType][0].name}`);
        return definitions[refType][0];
    }
}
function getFieldDefinition(params, definitions) {
    const paramsList = [];
    let content = '';
    // checkbox, select or input
    for (const param of params) {
        const ref = _.get(param, 'schema.$ref');
        if (ref) {
            const objectDef = definitions.find(d => {
                return `${conf_1.modelFile}.${d.name}` === common_1.translateType(ref).type;
            });
            const properties = objectDef.def.properties;
            Object.entries(properties).forEach(([propertyName, property]) => {
                const validators = getValidators(property);
                if (objectDef.def.required && objectDef.def.required.includes(propertyName)) {
                    validators.push('Validators.required');
                }
                content += utils_1.indent(`${propertyName} = new FormControl('', [${validators.join(', ')}]);\n`);
                paramsList.push(propertyName);
            });
        }
        else if (param.type) {
            const validators = getValidators(param);
            if (param.required)
                validators.push('Validators.required');
            content += utils_1.indent(`${param.name} = new FormControl('', [${validators.join(', ')}]);\n`);
            paramsList.push(param.name);
        }
    }
    return { content, params: paramsList };
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
function getNgOnInit(params, name) {
    let res = utils_1.indent('ngOnInit() {\n');
    res += utils_1.indent(`this.${name}Form = this.formBuilder.group({\n`, 2);
    for (const param of params) {
        res += utils_1.indent(`${param}: this.${param},\n`, 3);
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