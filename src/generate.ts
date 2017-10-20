/**
 * generator of API models (interfaces) from BE API json
 * get it at http://bapp.doxologic.net/backend-web/api/v2/api-docs
 * and save to ./backend-services.json
 * run via `npm run generate:api:model`
 */
import * as conf from './conf';
import { processDefinitions } from './definitions';
import { processPaths } from './requests';

import * as schemaData from '../in/api-docs.json';

const schema = schemaData as any;

processPaths(schema.paths, `http://${schema.host}${schema.basePath}${conf.swaggerFile}`);
processDefinitions(schema.definitions);
