import * as _ from 'lodash';
import * as path from 'path';
import {translateType} from '../common';
import {modelFile} from '../conf';
import {ProcessedDefinition} from '../definitions';
import {Config} from '../generate';
import {Parameter, Schema} from '../types';
import {indent, writeFile} from '../utils';

export interface FieldDefinitionObj {
  content: string;
  params: string[];
}

export function createComponentTs(config: Config, name: string, params: Parameter[],
                                  definitions: ProcessedDefinition[], simpleName: string,
                                  formSubDirName: string, className: string) {
  let content = '';
  content += getImports(name);
  content += getComponent(simpleName);
  content += `export class ${className}Component implements OnInit {\n`;
  content += indent(`${name}Form: FormGroup;\n`);
  const fieldDefinition: FieldDefinitionObj = getFieldDefinition(params, definitions);

  // TODO! test
  const definitionsMap = _.groupBy(definitions, 'originalName');
  walkParamOrProp(params, definitionsMap);

  content += fieldDefinition.content + '\n';
  content += getConstructor(name);
  content += getNgOnInit(fieldDefinition.params, name);
  content += getFormSubmitFunction(name, simpleName, params);
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

function walkParamOrProp(definition: Parameter[] | ProcessedDefinition,
                         definitions: _.Dictionary<ProcessedDefinition[]>): void {
  // parameters
  if (Array.isArray(definition)) {
    definition.forEach(param => {
      const type = param.type;
      const ref = _.get(param, 'schema.$ref');
      const child = makeField(type, ref, definitions);
      if (child) walkParamOrProp(child, definitions);
    });
  // object definition
  } else {
    Object.entries(definition.def.properties).forEach(([paramName, param]) => {
      const type = param.type;
      const ref = param.$ref;
      const child = makeField(type, ref, definitions);
      if (child) walkParamOrProp(child, definitions);
    });
  }
}

function makeField(type: string, ref: string,
                   definitions: _.Dictionary<ProcessedDefinition[]>,
                  ): ProcessedDefinition | void {
  console.log(`type: ${type}, $ref: ${ref}`);
  if (type) {
    console.log(`primitive: ${type}`);
    return;
  } else {
    const refType = ref.replace(/^#\/definitions\//, '');
    console.log(`composite: ${definitions[refType][0].name}`);
    return definitions[refType][0];
  }
}

function getFieldDefinition(params: Parameter[], definitions: ProcessedDefinition[]): FieldDefinitionObj {
  const paramsList: string[] = [];
  let content = '';

  // checkbox, select or input
  for (const param of params) {
    const ref = _.get(param, 'schema.$ref');
    if (ref) {
      const objectDef = definitions.find(d => {
        return `${modelFile}.${d.name}` === translateType(ref).type;
      });
      const properties = objectDef.def.properties;

      Object.entries(properties).forEach(([propertyName, property]) => {
        const validators = getValidators(property);
        if (objectDef.def.required && objectDef.def.required.includes(propertyName)) {
          validators.push('Validators.required');
        }
        content += indent(`${propertyName} = new FormControl('', [${validators.join(', ')}]);\n`);
        paramsList.push(propertyName);
      });
    } else if (param.type) {
      const validators = getValidators(param);
      if (param.required) validators.push('Validators.required');
      content += indent(`${param.name} = new FormControl('', [${validators.join(', ')}]);\n`);
      paramsList.push(param.name);
    }
  }

  return {content, params: paramsList};
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

function getNgOnInit(params: string[], name: string) {
  let res = indent('ngOnInit() {\n');
  res += indent(`this.${name}Form = this.formBuilder.group({\n`, 2);
  for (const param of params) {
    res += indent(`${param}: this.${param},\n`, 3);
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
