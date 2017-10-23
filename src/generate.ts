/** Generator of API models (interfaces) from BE API json */
import * as fs from 'fs';

import * as conf from './conf';
import { processDefinitions } from './definitions';
import { processPaths } from './requests';
import { copyDir, out, processHeader } from './utils';

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

  // TODO(janwalter) aplly and create dest
  processPaths(schema.paths, `http://${schema.host}${schema.basePath}${conf.swaggerFile}`, header);
  processDefinitions(schema.definitions, header);

  copyDir(conf.servicesDir, dest);
}
