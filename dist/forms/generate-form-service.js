"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const nodePath = require("path");
const common_1 = require("../common");
const conf_1 = require("../conf");
const process_params_1 = require("../requests/process-params");
const utils_1 = require("../utils");
function generateFormService(config, name, params, definitions, simpleName, formSubDirName, className) {
    let content = '';
    const formName = 'form';
    const constructor = getConstructor(name, formName, definitions, params);
    content += getImports(name, constructor);
    content += `@Injectable()\n`;
    content += `export class ${className}FormService {\n`;
    content += utils_1.indent(`${formName}: FormGroup;\n`);
    content += constructor;
    content += getFormSubmitFunction(name, formName, simpleName, params);
    content += '}\n';
    const componentHTMLFileName = nodePath.join(formSubDirName, `${simpleName}.service.ts`);
    utils_1.writeFile(componentHTMLFileName, content, config.header);
}
exports.generateFormService = generateFormService;
function getImports(name, constructor) {
    const imports = [];
    if (constructor.match(/new FormArray\(/))
        imports.push('FormArray');
    if (constructor.match(/new FormControl\(/))
        imports.push('FormControl');
    if (constructor.match(/new FormGroup\(/))
        imports.push('FormGroup');
    if (constructor.match(/\[Validators\./))
        imports.push('Validators');
    let res = 'import {Injectable} from \'@angular/core\';\n';
    if (imports.length)
        res += `import {${imports.join(', ')}} from '@angular/forms';\n`;
    res += `import {${name}Service} from '../../../controllers/${name}';\n`;
    res += '\n';
    return res;
}
function getConstructor(name, formName, definitions, params) {
    let res = utils_1.indent('constructor(\n');
    res += utils_1.indent(`private ${_.lowerFirst(name)}Service: ${name}Service,\n`, 2);
    res += utils_1.indent(') {\n');
    const definitionsMap = _.groupBy(definitions, 'name');
    const formDefinition = walkParamOrProp(params, undefined, definitionsMap);
    res += utils_1.indent(`this.${formName} = new FormGroup({\n${formDefinition}\n});\n`, 2);
    res += utils_1.indent('}\n');
    res += '\n';
    return res;
}
function walkParamOrProp(definition, path = [], definitions) {
    const res = [];
    let schema;
    let required;
    // create unified inputs for
    // 1. parameters
    if (Array.isArray(definition)) {
        schema = {};
        required = [];
        definition.forEach(param => {
            if (param.required)
                required.push(param.name);
            schema[param.name] = process_params_1.parameterToSchema(param);
        });
        // 2. object definition
    }
    else {
        required = definition.def.required;
        schema = definition.def.properties;
    }
    // walk the list and build recursive form model
    Object.entries(schema).forEach(([paramName, param]) => {
        const name = paramName;
        const newPath = [...path, name];
        const ref = param.$ref;
        const isRequired = required && required.includes(name);
        const fieldDefinition = makeField(param, ref, name, newPath, isRequired, definitions);
        res.push(fieldDefinition);
    });
    return utils_1.indent(res);
}
function makeField(param, ref, name, path, required, definitions) {
    let definition;
    let type = param.type;
    let control;
    let initializer;
    if (type) {
        if (type in conf_1.nativeTypes) {
            const typedType = type;
            type = conf_1.nativeTypes[typedType];
        }
        // TODO implement arrays
        // use helper method and store type definition to add new array items
        if (type === 'array') {
            control = 'FormArray';
            initializer = '[]';
        }
        else {
            control = 'FormControl';
            initializer = typeof param.default === 'string' ? `'${param.default}'` : param.default;
        }
    }
    else {
        const refType = ref.replace(/^#\/definitions\//, '');
        definition = definitions[common_1.normalizeDef(refType)][0];
        control = 'FormGroup';
        const fields = walkParamOrProp(definition, path, definitions);
        initializer = `{\n${fields}\n}`;
    }
    const validators = getValidators(param);
    if (required)
        validators.push('Validators.required');
    return `${name}: new ${control}(${initializer}, [${validators.join(', ')}]),`;
}
function getValidators(param) {
    const validators = [];
    if (param.format && param.format === 'email')
        validators.push('Validators.email');
    if (param.maximum)
        validators.push(`Validators.max(${param.maxLength})`);
    if (param.minimum)
        validators.push(`Validators.min(${param.minLength})`);
    if (param.maxLength)
        validators.push(`Validators.maxLength(${param.maxLength})`);
    if (param.minLength)
        validators.push(`Validators.minLength(${param.minLength})`);
    if (param.pattern)
        validators.push(`Validators.pattern('${param.pattern})`);
    return validators;
}
function getFormSubmitFunction(name, formName, simpleName, paramGroups) {
    let res = utils_1.indent('submit() {\n');
    res += utils_1.indent(`return this.${_.lowerFirst(name)}Service.${simpleName}(${getSubmitFnParameters(formName, paramGroups)});\n`, 2);
    res += utils_1.indent('}\n');
    return res;
}
function getSubmitFnParameters(name, paramGroups) {
    if (paramGroups.length)
        return `this.${name}.value`;
    return '';
}
//# sourceMappingURL=generate-form-service.js.map