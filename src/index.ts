#!/usr/bin/env node
import * as commander from 'commander';

import * as conf from './conf';
import {generate} from './generate';

commander
  .option('-s, --src <source>', `Source directory, default: ${conf.apiFile}`)
  .option('-d, --dest <destination>', `Destination directory, default: ${conf.outDir}`)
  .option('--no-store', 'Do not generate store')
  .option('-w, --unwrap-single-param-methods',
    'Controller methods with a single parameter get a method_() where the parameter object is unwrapped')
  /* tslint:disable-next-line:max-line-length */
  .option('-u, --swagger-URL-path', `swagger URL path, where the swagger ui documentation can be found; default: ${conf.swaggerURLPath}, i.e. the resulting address would be http://example/${conf.swaggerURLPath}`)
  .parse(process.argv);

generate(commander.src, commander.dest, commander.store, commander.unwrapSingleParamMethods, commander.swaggerURLPath);
