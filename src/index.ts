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
  .parse(process.argv);

generate(commander.src, commander.dest, commander.store, commander.unwrapSingleParamMethods);
