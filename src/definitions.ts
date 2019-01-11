/**
 * Processing of custom types from `definitions` section
 * in the schema
 */
import * as _ from 'lodash';
import * as path from 'path';

import {normalizeDef, processProperty} from './common';
import * as conf from './conf';
import {Config} from './generate';
import {Schema} from './types';
import {emptyDir, indent, writeFile} from './utils';

export interface ProcessedDefinition {
  name: string;
  def: Schema;
}

/**
 * Entry point, processes all definitions and exports them
 * to individual files
 * @param defs definitions from the schema
 * @param config global configuration
 */
export function processDefinitions(defs: {[key: string]: Schema}, config: Config): ProcessedDefinition[] {
  emptyDir(path.join(config.dest, conf.defsDir));

  const definitions: ProcessedDefinition[] = [];
  const files: {[key: string]: string[]} = {};

  _.forOwn(defs, (v, source) => {
    const file = processDefinition(v, source, config);
    if (file && file.name) {
      const previous = files[file.name];
      if (previous === undefined) files[file.name] = [source];
      else previous.push(source);
      definitions.push(file);
    }
  });

  let allExports = '';
  _.forOwn(files, (sources, def) => {
    allExports += createExport(def) + createExportComments(def, sources) + '\n';
  });

  writeToBaseModelFile(config, allExports);

  return definitions;
}

export function writeToBaseModelFile(config: Config, allExports: string) {
  const filename = path.join(config.dest, `${conf.modelFile}.ts`);
  writeFile(filename, allExports, config.header);
}

/**
 * Creates the file of the type definition
 * @param def type definition
 * @param name name of the type definition and after normalization of the resulting interface + file
 */
export function processDefinition(def: Schema, name: string, config: Config): ProcessedDefinition {
  name = normalizeDef(name);

  let output = '';
  if (def.type === 'array') {
    const property = processProperty(def)[0];
    if (!property.native) {
      output += `import * as __${conf.modelFile} from \'../${conf.modelFile}\';\n\n`;
    }
    if (def.description) output += `/** ${def.description} */\n`;
    output += `export type ${name} = ${property.property};\n`;
  } else if (def.properties || def.additionalProperties) {
    const properties = processProperty(def, undefined, name);
    // conditional import of global types
    if (properties.some(p => !p.native)) {
      output += `import * as __${conf.modelFile} from \'../${conf.modelFile}\';\n\n`;
    }
    if (def.description) output += `/** ${def.description} */\n`;

    output += `export interface ${name} {\n`;
    output += indent(_.map(properties, 'property').join('\n'));
    output += `\n}\n`;

    // concat non-empty enum lines
    const enumLines = _.map(properties, 'enumDeclaration').filter(Boolean).join('\n\n');
    if (enumLines) output += `\n${enumLines}\n`;
  } else if (def.type !== 'object') {
    const property = processProperty(def)[0];
    if (!property.native) {
      output += `import * as __${conf.modelFile} from \'../${conf.modelFile}\';\n\n`;
    }

    output += `export type ${name} = ${property.property};\n`;
  }

  const filename = path.join(config.dest, conf.defsDir, `${name}.ts`);
  writeFile(filename, output, config.header);

  return {name, def};
}

/**
 * Creates single export line for `def` name
 * @param def name of the definition file w/o extension
 */
export function createExport(def: string): string {
  return `export * from './${conf.defsDir}/${def}';`;
}

/**
 * Creates comment naming source definitions for the export
 * @param def name of the definition file w/o extension
 * @param sources list of sources for the file
 */
function createExportComments(file: string, sources: string[]): string {
  if (sources.length > 1 || !sources.includes(file)) {
    return ' // sources: ' + sources.join(', ');
  }

  return '';
}
