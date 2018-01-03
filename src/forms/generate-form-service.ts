import * as _ from 'lodash';
import * as nodePath from 'path';

import {normalizeDef} from '../common';
import {nativeTypes} from '../conf';
import {ProcessedDefinition} from '../definitions';
import {Config} from '../generate';
import {parameterToSchema} from '../requests/process-params';
import {NativeNames, Parameter, Schema} from '../types';
import {indent, writeFile} from '../utils';

export interface FieldDefinition {
  content: string;
  params: string[];
}

export function generateFormService(config: Config, name: string, params: Parameter[],
                                    definitions: ProcessedDefinition[], simpleName: string,
                                    formSubDirName: string, className: string) {
  let content = '';
  const formName = 'form';
  const constructor = getConstructor(name, formName, definitions, params);

  content += getImports(name, constructor);
  content += `@Injectable()\n`;
  content += `export class ${className}FormService {\n`;

  content += indent(`${formName}: FormGroup;\n`);
  content += constructor;
  content += getFormSubmitFunction(name, formName, simpleName, params);
  content += '}\n';

  const componentHTMLFileName = nodePath.join(formSubDirName, `${simpleName}.service.ts`);
  writeFile(componentHTMLFileName, content, config.header);
}

function getImports(name: string, constructor: string) {
  const imports: string[] = [];

  if (constructor.match(/new FormArray\(/)) imports.push('FormArray');
  if (constructor.match(/new FormControl\(/)) imports.push('FormControl');
  if (constructor.match(/new FormGroup\(/)) imports.push('FormGroup');
  if (constructor.match(/\[Validators\./)) imports.push('Validators');

  let res = 'import {Injectable} from \'@angular/core\';\n';
  if (imports.length) res += `import {${imports.join(', ')}} from '@angular/forms';\n`;
  res += `import {${name}Service} from '../../../controllers/${name}';\n`;
  res += '\n';

  return res;
}

function getConstructor(name: string, formName: string, definitions: ProcessedDefinition[], params: Parameter[]) {
  let res = indent('constructor(\n');
  res += indent(`private ${_.lowerFirst(name)}Service: ${name}Service,\n`, 2);
  res += indent(') {\n');

  const definitionsMap = _.groupBy(definitions, 'name');
  const formDefinition = walkParamOrProp(params, undefined, definitionsMap);
  res += indent(`this.${formName} = new FormGroup({\n${formDefinition}\n});\n`, 2);
  res += indent('}\n');
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
    const fieldDefinition = makeField(param, ref, name, newPath, isRequired, definitions);

    res.push(fieldDefinition);
  });

  return indent(res);
}

function makeField(param: Schema, ref: string,
                   name: string, path: string[], required: boolean,
                   definitions: _.Dictionary<ProcessedDefinition[]>): string {

  let definition: ProcessedDefinition;
  let type = param.type;
  let control: string;
  let initializer: string;

  if (type) {
    if (type in nativeTypes) {
      const typedType = type as NativeNames;
      type = nativeTypes[typedType];
    }

    // TODO implement arrays
    // use helper method and store type definition to add new array items
    if (type === 'array') {
      control = 'FormArray';
      initializer = '[]';
    } else {
      control = 'FormControl';
      initializer = typeof param.default === 'string' ? `'${param.default}'` : param.default;
    }
  } else {
    const refType = ref.replace(/^#\/definitions\//, '');
    definition = definitions[normalizeDef(refType)][0];

    control = 'FormGroup';
    const fields = walkParamOrProp(definition, path, definitions);
    initializer = `{\n${fields}\n}`;
  }

  const validators = getValidators(param);
  if (required) validators.push('Validators.required');

  return `${name}: new ${control}(${initializer}, [${validators.join(', ')}]),`;
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

function getFormSubmitFunction(name: string, formName: string, simpleName: string, paramGroups: Parameter[]) {
  let res = indent('submit() {\n');
  res += indent(
    `return this.${_.lowerFirst(name)}Service.${simpleName}(${getSubmitFnParameters(formName, paramGroups)});\n`, 2);
  res += indent('}\n');

  return res;
}

function getSubmitFnParameters(name: string, paramGroups: Parameter[]) {
  if (paramGroups.length) return `this.${name}.value`;
  return '';
}
