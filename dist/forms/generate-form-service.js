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
    if (constructor.match(/new FormControl\(/))
        imports.push('FormControl');
    if (constructor.match(/new FormGroup\(/))
        imports.push('FormGroup');
    if (constructor.match(/\[Validators\./))
        imports.push('Validators');
    let res = 'import {Injectable} from \'@angular/core\';\n';
    if (imports.length)
        res += `import {${imports.join(', ')}} from '@angular/forms';\n`;
    if (constructor.match(/new FormArrayExtended\(/)) {
        res += `import {FormArrayExtended} from '../../../common/formArrayExtended';\n`;
    }
    res += `import {${name}Service} from '../../../controllers/${name}';\n`;
    res += '\n';
    return res;
}
function getConstructor(name, formName, definitions, params) {
    let res = utils_1.indent('constructor(\n');
    res += utils_1.indent(`private ${_.lowerFirst(name)}Service: ${name}Service,\n`, 2);
    res += utils_1.indent(') {\n');
    const definitionsMap = _.groupBy(definitions, 'name');
    const formDefinition = walkParamOrProp(params, definitionsMap);
    res += utils_1.indent(`this.${formName} = new FormGroup({\n${formDefinition}\n});\n`, 2);
    res += utils_1.indent('}\n');
    res += '\n';
    return res;
}
function walkParamOrProp(definition, definitions, parentTypes = []) {
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
        // 2. properties
    }
    else if (definition.def.properties) {
        required = definition.def.required;
        schema = definition.def.properties || {};
    }
    // walk the list and build recursive form model
    Object.entries(schema).forEach(([paramName, param]) => {
        const isRequired = required && required.includes(paramName);
        const fieldDefinition = makeField(param, paramName, isRequired, definitions, parentTypes);
        if (fieldDefinition)
            res.push(fieldDefinition);
    });
    return utils_1.indent(res);
}
function makeField(param, name, required, definitions, parentTypes) {
    let newParentTypes = [...parentTypes];
    if (!param.type) {
        const ref = param.$ref;
        const refType = ref.replace(/^#\/definitions\//, '');
        const defType = common_1.normalizeDef(refType);
        param = definitions[defType][0].def;
        // break type definition chain with cycle
        if (parentTypes.indexOf(ref) >= 0)
            return;
        if (ref)
            newParentTypes = [...newParentTypes, ref];
    }
    let type = param.type;
    if (type in conf_1.nativeTypes)
        type = conf_1.nativeTypes[type];
    let control;
    let initializer;
    if (type === 'array') {
        control = 'FormArrayExtended';
        initializer = `() => `;
        const controlInstance = makeField(param.items, undefined, required, definitions, newParentTypes);
        initializer += `(\n${utils_1.indent(controlInstance)})`;
    }
    else if (type === 'object') {
        control = 'FormGroup';
        const def = {
            name: '',
            def: param,
        };
        const fields = walkParamOrProp(def, definitions, newParentTypes);
        initializer = `{\n${fields}\n}`;
    }
    else {
        control = 'FormControl';
        initializer = typeof param.default === 'string' ? `'${param.default}'` : param.default;
    }
    const validators = getValidators(param);
    if (required)
        validators.push('Validators.required');
    let res = `new ${control}(${initializer}, [${validators.join(', ')}])`;
    if (name)
        res = `${name}: ${res},`;
    return res;
}
function getValidators(param) {
    const validators = [];
    if (param.format && param.format === 'email')
        validators.push('Validators.email');
    if (param.maximum)
        validators.push(`Validators.max(${param.maximum})`);
    if (param.minimum)
        validators.push(`Validators.min(${param.minimum})`);
    if (param.maxLength)
        validators.push(`Validators.maxLength(${param.maxLength})`);
    if (param.minLength)
        validators.push(`Validators.minLength(${param.minLength})`);
    if (param.pattern)
        validators.push(`Validators.pattern(/${param.pattern}/)`);
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