/** Generator of API models (interfaces) from BE API json */
import * as fs from 'fs';
import * as conf from './conf';

import {processDefinitions} from './definitions';
import {processPaths} from './requests/process-paths';
import {out, processHeader, TermColors} from './utils';

export interface Config {
  header: string;
  dest: string;
  generateStore: boolean;
  unwrapSingleParamMethods: boolean;
}

/**
 * Generates API layer for the project based on src to dest
 * @param src source swagger json schema
 * @param dest destination directory
 */
export function generate(
  src: string = conf.apiFile,
  dest: string = conf.outDir,
  generateStore = true,
  unwrapSingleParamMethods = false) {

  let schema: any;

  try {
    const content = fs.readFileSync(src);
    schema = JSON.parse(content.toString());
  } catch (e) {
    if (e instanceof SyntaxError) {
      out(`${src} is either not a valid JSON scheme or contains non-printable characters`, TermColors.red);
    } else out(`JSON scheme file '${src}' does not exist`, TermColors.red);

    out(`${e}`);
    return;
  }

  const header = processHeader(schema);
  const config: Config = {header, dest, generateStore, unwrapSingleParamMethods};

  if (!fs.existsSync(dest)) fs.mkdirSync(dest);

  const definitions = processDefinitions(schema.definitions, config);
  processPaths(schema.paths, `http://${schema.host}${schema.basePath}${conf.swaggerFile}`,
               config, definitions);
}
