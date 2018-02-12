import {Config} from '../generate';
import * as path from 'path';
import {indent, writeFile} from '../utils';
import {Parameter, Schema} from '../types';
import {ProcessDefinition} from '../definitions';
import {FieldDefinitionObj} from './process-ts-component';

export interface Validator {
  type: string;
  errorDescription: string;
}

export function createComponentHTML(config: Config, name: string,
                                    paramGroups: Parameter[], schemaObjectDefinitions: ProcessDefinition[],
                                    formSubDirName: string, simpleName: string) {
  const schemaObjectDefinitionsKeys: string[] = schemaObjectDefinitions.map(s => s.name.toLowerCase());
  const formName = `${name}Form`;
  const submitFunctionName = `${name.toLowerCase()}`;

  let content = '';
  content = getBeginingOfFile(content, formName, submitFunctionName, name);

  const fieldDefinition: FieldDefinitionObj = getFieldDefinition(paramGroups, schemaObjectDefinitionsKeys,
                                                                 schemaObjectDefinitions, content);
  content = fieldDefinition.content;

  content = getEndOfFile(content);

  const componentTsFileName = path.join(formSubDirName, `${simpleName}.component.html`);
  writeFile(componentTsFileName, content, config.header, 'html');
}

export function getBeginingOfFile(content: string, formName: string, submitFunctionName: string, name: string) {
  content += '<mat-card>\n';
  content += indent('<div fxFlex="20"></div>\n');
  content += indent('<div fxFlex="60">\n');
  content += indent(`<mat-card-title fxLayoutAlign="center center">${name}</mat-card-title>\n`);
  content += '\n';
  content += indent(
      `<form [formGroup]='${formName}' (ngSubmit)='${submitFunctionName}()' class='full-width'>\n`);
  content += '\n';
  return content;
}

export function getEndOfFile(content: string) {
  content += indent('</form>\n');
  content += indent('</div>\n');
  content += indent('<div fxFlex></div>\n');
  content += '</mat-card>';
  return content;
}

export function getFieldDefinition(paramGroups: Parameter[], schemaObjectDefinitionsKeys: string[],
                                   schemaObjectDefinitions: ProcessDefinition[], content: string) {
  const paramsArray: string[] = [];

  // checkbox, select or input
  for (const param of paramGroups) {

    if (schemaObjectDefinitionsKeys.includes(param.name.toLowerCase())) {

      const objDef: ProcessDefinition = schemaObjectDefinitions.find(
          obj => obj.name.toLowerCase() === param.name.toLowerCase());

      const properties = objDef.def.properties;

      Object.entries(properties).forEach(([key, value]) => {
        const validators = getValidators(value);
        if (objDef.def.required.includes(key)) validators.push(
            {type: 'required', errorDescription: 'This field is required'});

        content = createFieldDefinition(content, key, validators);

        paramsArray.push(key);
      });
    } else {
      const validators = getValidators(param);
      if (param.required) validators.push({type: 'required', errorDescription: 'This field is required'});

      content = createFieldDefinition(content, param.name, validators);

      paramsArray.push(param.name);
    }
  }
  return {content, paramsArray};
}

export function createFieldDefinition(content: string, key: string, validators: Validator[]) {
  content += indent(indent(`<div fxLayout='row' fxLayoutWrap >\n`));
  content += indent(indent(indent(`<mat-form-field class='account-form-full-width'>\n`)));
  content += indent(indent(indent(indent(
      `<input matInput type='text' name='${key}' [formControl]='${key}' placeholder="${key}" />\n`))));
  for (const validator of validators) {
    content += indent(indent(indent(indent(
        `<mat-error *ngIf="${key}.hasError('${validator.type}')">${validator.errorDescription}</mat-error>\n`))));
  }
  content += indent(indent(indent('</mat-form-field>\n')));
  content += indent(indent('</div>\n'));
  content += '\n';
  return content;
}

export function getValidators(param: Parameter | Schema): Validator[] {
  const validators: Validator[] = [];

  if (param.format && param.format === 'email') validators.push(
      {type: 'email', errorDescription: 'Email has invalid format'});
  if (param.maxLength) validators.push({type: 'maxLength', errorDescription: 'Maximum length exceeded'});
  if (param.minLength) validators.push({type: 'minLength', errorDescription: 'Too short'});
  if (param.pattern) validators.push({type: 'pattern', errorDescription: 'Value does not comply with rules'});

  return validators;
}
