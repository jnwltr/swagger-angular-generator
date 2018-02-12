"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils_1 = require("../utils");
function createComponentHTML(config, name, paramGroups, schemaObjectDefinitions, formSubDirName, simpleName) {
    const schemaObjectDefinitionsKeys = schemaObjectDefinitions.map(s => s.name.toLowerCase());
    const formName = `${name}Form`;
    const submitFunctionName = `${name.toLowerCase()}`;
    let content = '';
    content += getBeginingOfFile(formName, submitFunctionName, name);
    const fieldDefinition = getFieldDefinition(paramGroups, schemaObjectDefinitionsKeys, schemaObjectDefinitions);
    content += fieldDefinition.content;
    content += getEndOfFile();
    const componentTsFileName = path.join(formSubDirName, `${simpleName}.component.html`);
    utils_1.writeFile(componentTsFileName, content, config.header, 'html');
}
exports.createComponentHTML = createComponentHTML;
function getBeginingOfFile(formName, submitFunctionName, name) {
    let content = '<mat-card>\n';
    content += utils_1.indent('<div fxFlex="20"></div>\n');
    content += utils_1.indent('<div fxFlex="60">\n');
    content += utils_1.indent(`<mat-card-title fxLayoutAlign="center center">${name}</mat-card-title>\n`);
    content += '\n';
    content += utils_1.indent(`<form [formGroup]="${formName}" (ngSubmit)="${submitFunctionName}()" class="full-width">\n`);
    content += '\n';
    return content;
}
function getEndOfFile() {
    let content = utils_1.indent('</form>\n');
    content += utils_1.indent('</div>\n');
    content += utils_1.indent('<div fxFlex></div>\n');
    content += '</mat-card>';
    return content;
}
function getFieldDefinition(paramGroups, schemaObjectDefinitionsKeys, schemaObjectDefinitions) {
    const paramsArray = [];
    let content = '';
    // checkbox, select or input
    for (const param of paramGroups) {
        if (schemaObjectDefinitionsKeys.includes(param.name.toLowerCase())) {
            const objDef = schemaObjectDefinitions
                .find(obj => obj.name.toLowerCase() === param.name.toLowerCase());
            const properties = objDef.def.properties;
            Object.entries(properties).forEach(([key, value]) => {
                const validators = getValidators(value);
                if (objDef.def.required && objDef.def.required.includes(key)) {
                    validators.push({ type: 'required', errorDescription: 'This field is required' });
                }
                content += createFieldDefinition(key, validators);
                paramsArray.push(key);
            });
        }
        else {
            const validators = getValidators(param);
            if (param.required) {
                validators.push({ type: 'required', errorDescription: 'This field is required' });
            }
            content += createFieldDefinition(param.name, validators);
            paramsArray.push(param.name);
        }
    }
    return { content, paramsArray };
}
function createFieldDefinition(key, validators) {
    let res = '<div fxLayout="row" fxLayoutWrap>\n';
    res += utils_1.indent('<mat-form-field class="account-form-full-width">\n');
    res += utils_1.indent(`<input matInput type="text" name="${key}" [formControl]="${key}" placeholder="${key}" />\n`, 2);
    for (const validator of validators) {
        res += utils_1.indent(`<mat-error *ngIf="${key}.hasError('${validator.type}')">${validator.errorDescription}</mat-error>\n`, 2);
    }
    res += utils_1.indent('</mat-form-field>\n');
    res += utils_1.indent('</div>\n', 2);
    res += '\n';
    return utils_1.indent(res, 2);
}
function getValidators(param) {
    const validators = [];
    if (param.format && param.format === 'email') {
        validators.push({ type: 'email', errorDescription: 'Email has invalid format' });
    }
    if (param.maxLength)
        validators.push({ type: 'maxLength', errorDescription: 'Maximum length exceeded' });
    if (param.minLength)
        validators.push({ type: 'minLength', errorDescription: 'Too short' });
    if (param.pattern)
        validators.push({ type: 'pattern', errorDescription: 'Value does not comply with rules' });
    return validators;
}
//# sourceMappingURL=process-html-component.js.map