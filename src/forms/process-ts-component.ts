import {Config} from '../generate';
import * as path from 'path';
import {indent, writeFile} from '../utils';
import {Parameter, Schema} from '../types';
import {ProcessDefinition} from '../definitions';

export interface FieldDefinitionObj {
  content: string;
  paramsArray: string[];
}

export function createComponentTs(config: Config, name: string, paramGroups: Parameter[],
                                  schemaObjectDefinitions: ProcessDefinition[], simpleName: string,
                                  formSubDirName: string, className: string) {

  const schemaObjectDefinitionsKeys: string[] = schemaObjectDefinitions.map(s => s.name.toLowerCase());

  let content = '';
  content = getImports(content, name);
  content = getComponent(simpleName, content);

  content += `export class ${className}Component implements OnInit {\n`;
  content += indent(`${name}Form: FormGroup;\n`);
  const fieldDefinition: FieldDefinitionObj = getFieldDefinition(paramGroups, schemaObjectDefinitionsKeys,
                                                                 schemaObjectDefinitions, content);
  content = fieldDefinition.content + '\n';

  content = getConstructor(content, name);
  content = getNgOnInit(content, fieldDefinition, name);
  content = getFormSubmitFunction(content, name, simpleName, paramGroups);
  content += '}\n';

  const componentHTMLFileName = path.join(formSubDirName, `${simpleName}.component.ts`);
  writeFile(componentHTMLFileName, content, config.header);
}

export function getImports(content: string, name: string) {
  content += 'import {Component, OnInit} from \'@angular/core\';\n';
  content += 'import {FormBuilder, FormControl, FormGroup, Validators} from \'@angular/forms\';\n';
  content += `import {${name}Service} from '../../../controllers/${name}';\n`;
  content += '\n';
  return content;
}

export function getComponent(simpleName: string, content: string) {
  content += '@Component({\n';
  content += indent(`selector: '${simpleName}',\n`);
  content += indent(`templateUrl: './${simpleName}.component.html',\n`);
  content += '})\n';
  content += '\n';
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
        if (objDef.def.required.includes(key)) validators.push('Validators.required');

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

export function getValidators(param: Parameter | Schema) {
  const validators: string[] = [];

  if (param.format && param.format === 'email') validators.push('Validators.email');
  if (param.maxLength) validators.push(`Validators.maxLength(${param.maxLength})`);
  if (param.minLength) validators.push(`Validators.minLength(${param.minLength})`);
  if (param.pattern) validators.push(`Validators.pattern('${param.pattern})`);

  return validators;
}

export function getConstructor(content: string, name: string) {
  content += indent('constructor(\n');
  content += indent(indent('private formBuilder: FormBuilder,\n'));
  content += indent(indent(`private ${name.toLowerCase()}Service: ${name}Service,\n`));
  content += indent(') {}\n');
  content += '\n';
  return content;
}

export function getNgOnInit(content: string, fieldDefinition: FieldDefinitionObj, name: string) {
  content += indent('ngOnInit() {\n');
  content += indent(indent(`this.${name}Form = this.formBuilder.group({\n`));
  for (const pa of fieldDefinition.paramsArray) {
    content += indent(indent(indent(`${pa}: this.${pa},\n`)));
  }
  content += indent(indent(`}, {updateOn: 'change'});\n`));
  content += indent('}\n');
  content += '\n';
  return content;
}

export function getFormSubmitFunction(content: string, name: string, simpleName: string, paramGroups: Parameter[]) {
  content += indent(`${name.toLowerCase()}() {\n`);
  content += indent(indent(`this.${name.toLowerCase()}Service.${simpleName}(${getSubmitFnParameters(name, paramGroups)});\n`));
  content += indent('}\n');
  content += '\n';
  return content;
}

export function getSubmitFnParameters(name: string, paramGroups: Parameter[]) {
  if (paramGroups.length) {
    return `this.${name}Form.value`;
  } else {
    return '';
  }
}
