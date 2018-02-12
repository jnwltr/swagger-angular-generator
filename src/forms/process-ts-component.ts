import * as path from 'path';
import {ProcessDefinition} from '../definitions';
import {Config} from '../generate';
import {Parameter, Schema} from '../types';
import {indent, writeFile} from '../utils';

export interface FieldDefinitionObj {
  content: string;
  paramsArray: string[];
}

export function createComponentTs(config: Config, name: string, paramGroups: Parameter[],
                                  schemaObjectDefinitions: ProcessDefinition[], simpleName: string,
                                  formSubDirName: string, className: string) {

  const schemaObjectDefinitionsKeys: string[] = schemaObjectDefinitions.map(s => s.name.toLowerCase());

  let content = '';
  content += getImports(name);
  content += getComponent(simpleName);
  content += `export class ${className}Component implements OnInit {\n`;
  content += indent(`${name}Form: FormGroup;\n`);
  const fieldDefinition: FieldDefinitionObj = getFieldDefinition(paramGroups, schemaObjectDefinitionsKeys,
                                                                 schemaObjectDefinitions);
  content += fieldDefinition.content + '\n';
  content += getConstructor(name);
  content += getNgOnInit(fieldDefinition, name);
  content += getFormSubmitFunction(name, simpleName, paramGroups);
  content += '}\n';

  const componentHTMLFileName = path.join(formSubDirName, `${simpleName}.component.ts`);
  writeFile(componentHTMLFileName, content, config.header);
}

function getImports(name: string) {
  let res = 'import {Component, OnInit} from \'@angular/core\';\n';
  res += 'import {FormBuilder, FormControl, FormGroup, Validators} from \'@angular/forms\';\n';
  res += `import {${name}Service} from '../../../controllers/${name}';\n`;
  res += '\n';

  return res;
}

function getComponent(simpleName: string) {
  let res = '@Component({\n';
  res += indent(`selector: '${simpleName}',\n`);
  res += indent(`templateUrl: './${simpleName}.component.html',\n`);
  res += '})\n';
  res += '\n';

  return res;
}

function getFieldDefinition(paramGroups: Parameter[], schemaObjectDefinitionsKeys: string[],
                            schemaObjectDefinitions: ProcessDefinition[]) {
  const paramsArray: string[] = [];
  let content = '';

  // checkbox, select or input
  for (const param of paramGroups) {
    if (schemaObjectDefinitionsKeys.includes(param.name.toLowerCase())) {

      const objDef: ProcessDefinition = schemaObjectDefinitions.find(
          obj => obj.name.toLowerCase() === param.name.toLowerCase());
      const properties = objDef.def.properties;

      Object.entries(properties).forEach(([key, value]) => {
        const validators = getValidators(value);
        if (objDef.def.required && objDef.def.required.includes(key)) {
          validators.push('Validators.required');
        }
        content += indent(`${key} = new FormControl('', [${validators.join(', ')}]);\n`);
        paramsArray.push(key);
      });
    } else {
      const validators = getValidators(param);
      if (param.required) validators.push('Validators.required');
      content += indent(`${param.name} = new FormControl('', [${validators.join(', ')}]);\n`);
      paramsArray.push(param.name);
    }
  }

  return {content, paramsArray};
}

function getValidators(param: Parameter | Schema) {
  const validators: string[] = [];

  if (param.format && param.format === 'email') validators.push('Validators.email');
  if (param.maxLength) validators.push(`Validators.maxLength(${param.maxLength})`);
  if (param.minLength) validators.push(`Validators.minLength(${param.minLength})`);
  if (param.pattern) validators.push(`Validators.pattern('${param.pattern})`);

  return validators;
}

function getConstructor(name: string) {
  let res = indent('constructor(\n');
  res += indent('private formBuilder: FormBuilder,\n', 2);
  res += indent(`private ${name.toLowerCase()}Service: ${name}Service,\n`, 2);
  res += indent(') {}\n');
  res += '\n';

  return res;
}

function getNgOnInit(fieldDefinition: FieldDefinitionObj, name: string) {
  let res = indent('ngOnInit() {\n');
  res += indent(`this.${name}Form = this.formBuilder.group({\n`, 2);
  for (const pa of fieldDefinition.paramsArray) {
    res += indent(`${pa}: this.${pa},\n`, 3);
  }
  res += indent(`}, {updateOn: 'change'});\n`, 2);
  res += indent('}\n');
  res += '\n';

  return res;
}

function getFormSubmitFunction(name: string, simpleName: string, paramGroups: Parameter[]) {
  let res = indent(`${name.toLowerCase()}() {\n`);
  res += indent(
    `this.${name.toLowerCase()}Service.${simpleName}(${getSubmitFnParameters(name, paramGroups)});\n`, 2);
  res += indent('}\n');

  return res;
}

function getSubmitFnParameters(name: string, paramGroups: Parameter[]) {
  if (paramGroups.length) return `this.${name}Form.value`;
  return '';
}
