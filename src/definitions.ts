/**
 * Processing of custom types from `definitions` section
 * in the schema
 */
import * as _ from 'lodash';
import * as path from 'path';

import {normalizeDef, processProperty} from './common';
import * as conf from './conf';
import {Config} from './generate';
import {Schema, SchemaDictionary} from './types';
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
export function processDefinitions(defs: SchemaDictionary, config: Config): ProcessedDefinition[] {
  emptyDir(path.join(config.dest, conf.defsDir));

  const definitions: ProcessedDefinition[] = [];
  const files: { [key: string]: string[] } = {};
  const processedDefinition: SchemaDictionary = {};
  const definitionsWithoutReference: SchemaDictionary = {};
  const definitionsWithReference: SchemaDictionary = {};

  _.forOwn(defs, (v, source) => {
    if (!v.allOf) definitionsWithoutReference[source] = v;
    else definitionsWithReference[source] = v;
  });

  // First process definitions without any reference (no allOf property)
  _.forOwn(definitionsWithoutReference, (v, source) => {
    const file = processDefinition(v, source, config);
    if (file && file.name) {
      processedDefinition[source] = v;
      const previous = files[file.name];
      if (previous === undefined) files[file.name] = [source];
      else previous.push(source);
      definitions.push(file);
    }
  });

  // Then in loop process all other
  const unprocessedDefinitions = definitionsWithReference;
  do {
    _.forOwn(unprocessedDefinitions, (v, source) => {
      const file = processDefinition(v, source, config, processedDefinition);
      if (file && file.name) {
        processedDefinition[source] = v;
        delete unprocessedDefinitions[source];
        const previous = files[file.name];
        if (previous === undefined) files[file.name] = [source];
        else previous.push(source);
        definitions.push(file);
      }
    });
  } while (Object.keys(unprocessedDefinitions).length);

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
 * @param config
 * @param processedSchemes
 */
export function processDefinition(def: Schema, name: string, config: Config,
                                  processedSchemes?: SchemaDictionary): ProcessedDefinition {
  name = normalizeDef(name);

  let output = '';
  if (def.type === 'array') {
    const property = processProperty(def)[0];
    if (!property.native) {
      output += `import * as __${conf.modelFile} from \'../${conf.modelFile}\';\n\n`;
    }
    if (def.description) output += `/** ${def.description} */\n`;
    output += `export type ${name} = ${property.property};\n`;

  } else if (def.allOf) {
    const parentName = getParentOfAllOf(def);

    if (!isLatestParentDefined(parentName, processedSchemes)) {
      return null;
    } else {
      const parentProperties = getAllParentsProperties(def, processedSchemes);

      def.allOf[1].properties = differencesInProperties(def.allOf[1].properties, parentProperties);

      const properties = processProperty(def.allOf[1], undefined, name);

      output += `import * as __${conf.modelFile} from \'../${conf.modelFile}\';\n\n`;
      if (def.description) output += `/** ${def.description} */\n`;

      output += `export interface ${name} extends __model.${parentName} {\n`;
      output += indent(_.map(properties, 'property').join('\n'));
      output += `\n}\n`;

      // concat non-empty enum lines
      const enumLines = _.map(properties, 'enumDeclaration').filter(Boolean).join('\n\n');
      if (enumLines) output += `\n${enumLines}\n`;

      def = def.allOf[1];
    }
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

function differencesInProperties(child: any, parent: any) {
  const propertiesKeys = _.difference(Object.keys(child), Object.keys(parent));
  const properties: any = {};
  propertiesKeys.forEach(key => {
    properties[key] = child[key];
  });

  return properties;
}

function getParentOfAllOf(def: Schema) {
  if (!def.allOf) throw new Error('Definition does not have any parent');
  const parentNameSplit = def.allOf[0].$ref.split('/');
  return parentNameSplit[parentNameSplit.length - 1];
}

/**
 * Gets all properties of all ancestors
 * @param child
 * @param processedSchemes
 */
function getAllParentsProperties(child: Schema, processedSchemes?: SchemaDictionary): any {
  const parent = Object.entries(processedSchemes).find(([key, _value]) => key === getParentOfAllOf(child))[1];

  if (parent.allOf) {
    return {...getAllParentsProperties(parent, processedSchemes), ...parent.allOf[1].properties};
  } else {
    return parent.properties;
  }
}

/**
 * Removes duplicities in child and its parent
 * @param parentName
 * @param processedDefinition
 */
function isLatestParentDefined(parentName: string, processedDefinition: SchemaDictionary): boolean {
  return Object.entries(processedDefinition).some(([key, val]) => {
    if (key === parentName) {
      if (val.allOf) {
        const parentNameSplit = val.allOf[0].$ref.split('/');
        const parentParentName = parentNameSplit[parentNameSplit.length - 1];
        return isLatestParentDefined(parentParentName, processedDefinition);
      } else {
        return true;
      }
    } else {
      return false;
    }
  });
}
