/** Generator of API models (interfaces) from BE API json */
import * as fs from 'fs';

import * as conf from './conf';
import { processDefinitions } from './definitions';
import { processPaths } from './requests';
import { copyDir, out, processHeader } from './utils';

export interface Config {
  header: string;
  dest: string;
}

export function generate(src: string = conf.apiFile, dest: string = conf.outDir) {
  let schema: any;

  try {
    const content = fs.readFileSync(src);
    schema = JSON.parse(content.toString());
  } catch (e) {
    if (e instanceof SyntaxError) out(`${src} is not a valid JSON scheme`, 'red');
    else out(`JSON scheme file '${src}' does not exist`, 'red');

    out(`${e}`);
    return;
  }

  const header = processHeader(schema);
  const config: Config = {header, dest};

  if (!fs.existsSync(dest)) fs.mkdirSync(dest);

  processPaths(schema.paths, `http://${schema.host}${schema.basePath}${conf.swaggerFile}`, config);
  processDefinitions(schema.definitions, config);

  copyDir(conf.servicesDir, dest);
}
