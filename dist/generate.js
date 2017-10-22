"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * generator of API models (interfaces) from BE API json
 * get it at http://bapp.doxologic.net/backend-web/api/v2/api-docs
 * and save to ./backend-services.json
 * run via `npm run generate:api:model`
 */
const schemaData = require("../in/api-docs.json");
const conf = require("./conf");
const definitions_1 = require("./definitions");
const requests_1 = require("./requests");
const utils_1 = require("./utils");
const schema = schemaData;
requests_1.processPaths(schema.paths, `http://${schema.host}${schema.basePath}${conf.swaggerFile}`);
definitions_1.processDefinitions(schema.definitions);
utils_1.copyDir(conf.servicesDir, conf.outDir);
//# sourceMappingURL=generate.js.map