import {readFileSync} from 'fs';
import {basename, join} from 'path';

import {writeFile} from '../utils';

export function addUtils(dest: string) {
  writeTemplate(join(dest, `utils.ts`));
}

export function addFormExtensions(dest: string) {
  writeTemplate(join(dest, `formArrayExtended.ts`));
  writeTemplate(join(dest, `formMap.ts`));
}

export function writeTemplate(dst: string) {
  const srcFileName = join(__dirname, 'templates', basename(dst));
  const dstFileName = join(dst);
  const content = readFileSync(srcFileName).toString();
  writeFile(dstFileName, content, undefined, 'ts', []);
}
