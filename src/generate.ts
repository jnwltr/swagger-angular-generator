/** Generator of API models (interfaces) from BE API json */
import * as fs from 'fs';
import * as conf from './conf';

import {processDefinitions} from './definitions';
import {processPaths} from './requests/process-paths';
import {out, processHeader} from './utils';

export interface Config {
  header: string;
  dest: string;
  baseUrl: string;
}

/**
 * Generates API layer for the project based on src to dest
 * @param src source swagger json schema
 * @param dest destination directory
 */
export function generate(src: string = conf.apiFile, dest: string = conf.outDir) {
  let schema: any;

  try {
    const content = fs.readFileSync(src);
    schema = JSON.parse(content.toString());
  } catch (e) {
    if (e instanceof SyntaxError) {
      out(`${src} is either not a valid JSON scheme or contains non-printable characters`, 'red');
    } else out(`JSON scheme file '${src}' does not exist`, 'red');

    out(`${e}`);
    return;
  }

  const header = processHeader(schema);
  const config: Config = {
    header,
    dest,
    baseUrl: `${(schema.schemes || [])[0] || 'http'}://${schema.host}${schema.basePath}`,
  };

  if (!fs.existsSync(dest)) fs.mkdirSync(dest);

  processPaths(schema.paths, `http://${schema.host}${schema.basePath}${conf.swaggerFile}`, config);
  processDefinitions(schema.definitions, config);
}
