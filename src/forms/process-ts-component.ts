import * as _ from 'lodash';
import * as nodePath from 'path';
import {processProperty, translateType} from '../common';
import {nativeTypes} from '../conf';
import {ProcessedDefinition} from '../definitions';
import {Config} from '../generate';
import {parameterToSchema} from '../requests/process-params';
import {NativeNames, Parameter, Schema} from '../types';
import {indent, out, TermColors, writeFile} from '../utils';

export interface FieldDefinition {
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

  const definitionsKeys: string[] = definitions.map(s => s.name);
  const fieldDefinition: FieldDefinition = getFieldDefinition(params, definitionsKeys, definitions);

  // TODO! check if originalName necessary
  const definitionsMap = _.groupBy(definitions, 'originalName');
  const formDefinition = walkParamOrProp(params, undefined, definitionsMap);

  out(formDefinition);

  content += fieldDefinition.content + '\n';
  content += getConstructor(name);
  content += getNgOnInit(fieldDefinition.params, name);
  content += getFormSubmitFunction(name, simpleName, params);
  content += '}\n';

  const componentHTMLFileName = nodePath.join(formSubDirName, `${simpleName}.component.ts`);
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

function walkParamOrProp(definition: Parameter[] | ProcessedDefinition, path: string[] = [],
                         definitions: _.Dictionary<ProcessedDefinition[]>): string {
  const res: string[] = [];
  let schema: Record<string, Schema>;
  let required: string[];

  // create unified inputs for
  // 1. parameters
  if (Array.isArray(definition)) {
    schema = {};
    required = [];
    definition.forEach(param => {
      if (param.required) required.push(param.name);
      schema[param.name] = parameterToSchema(param);
    });
  // 2. object definition
  } else {
    required = definition.def.required;
    schema = definition.def.properties;
  }

  // walk the list and build recursive form model
  Object.entries(schema).forEach(([paramName, param]) => {
    const name = paramName;
    const newPath = [...path, name];
    const ref = param.$ref;
    const isRequired = required && required.includes(name);
    const child = makeField(param, ref, name, newPath, isRequired, definitions);

    let initializer: string;
    if (child.definition) {
      const fields = walkParamOrProp(child.definition, newPath, definitions);
      initializer = `{\n${indent(fields)}\n}`;
    } else initializer = param.default;

    const submodel = `${child.name}: new ${child.control}(${initializer}, [${child.validators.join(', ')}]),`;
    res.push(submodel);
  });

  return `new FormGroup({${indent(res)}})`;
}

interface FormField {
  name: string;
  type: string;
  control: string;
  definition: ProcessedDefinition;
  validators: string[];
  debug?: string[];
}
function makeField(param: Schema, ref: string,
                   name: string, path: string[], required: boolean,
                   definitions: _.Dictionary<ProcessedDefinition[]>,
                  ): FormField {

  let definition: ProcessedDefinition;
  let type = param.type;
  let control: string;

  const validators = getValidators(param);
  if (required) validators.push('Validators.required');

  if (type) {
    if (type in nativeTypes) {
      const typedType = type as NativeNames;
      type = nativeTypes[typedType];
    }
    if (type === 'array') {
      control = 'FormArray';
      return {name, definition, type, validators, control};
    }

    control = 'FormControl';
  } else {
    const refType = ref.replace(/^#\/definitions\//, '');
    definition = definitions[refType][0];
    // out(definition.name + ' - ' + definition.originalName, TermColors.green);
    // type = definition.name;

    control = 'FormGroup';
  }

  // out(`name: ${name}, path: ${path.join('.')}, type: ${type}, $ref: ${ref}`);
  // out(JSON.stringify(translateType(type || ref)), TermColors.red);

  return {name, definition, type, validators, control};
}

function getFieldDefinition(paramGroups: Parameter[], definitionKeys: string[],
                            definitions: ProcessedDefinition[]): FieldDefinition {
  const paramsList: string[] = [];
  let content = '';

  // checkbox, select or input
  for (const param of paramGroups) {
    if (definitionKeys.includes(param.name.toLowerCase())) {

      const objDef: ProcessedDefinition = definitions.find(
          obj => obj.name.toLowerCase() === param.name.toLowerCase());
      const properties = objDef.def.properties;

      Object.entries(properties).forEach(([key, value]) => {
        const validators = getValidators(value);
        if (objDef.def.required && objDef.def.required.includes(key)) {
          validators.push('Validators.required');
        }
        content += indent(`${key} = new FormControl('', [${validators.join(', ')}]);\n`);
        paramsList.push(key);
      });
    } else {
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

  if (param.maximum) validators.push(`Validators.max(${param.maxLength})`);
  if (param.minimum) validators.push(`Validators.min(${param.minLength})`);

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
