import * as fs from 'fs';
import * as conf from './conf';
import {FileType} from './types';

/**
 * Checks if directory exists
 * @param path
 */
function doesDirExist(path: string) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
}

/**
 * Creates directory based on provided path
 * @param path
 */
export function createDir(path: string) {
  if (!doesDirExist(path)) fs.mkdirSync(path);
}

/**
 * Recursively deletes the path and optionally creates self as an empty directory
 * @param path
 * @param removeSelf whether to remove the directory itself or just its content
 */
export function emptyDir(path: string, removeSelf = false) {
  if (!fs.existsSync(path)) {
    if (!removeSelf) fs.mkdirSync(path);
    return;
  }

  fs.readdirSync(path).forEach(file => {
    const current = `${path}/${file}`;

    if (fs.lstatSync(current).isDirectory()) emptyDir(current, removeSelf);
    else fs.unlinkSync(current);
  });

  if (removeSelf) fs.rmdirSync(path);
}

/**
 * Indents the input
 * @param input string (with new-line separation) or array of lines
 * @param level of indentation, takes into account `conf` indentation setting
 */
export function indent(input: string | string[], level = 1): string {
  if (Array.isArray(input)) input = input.join('\n');

  let res: string;
  res = input.replace(/^/gm, ' '.repeat(level * conf.indentation));
  res = res.replace(/^\s+$/gm, '');

  return res;
}

/**
 * Serializes the content to the file including global header
 * @param file
 * @param content
 */
export function writeFile(file: string, content: string, header = '', fileType: FileType = 'ts',
                          disableFlags?: string[]): void {
  if (fileType === 'ts') {
    if (!disableFlags) disableFlags = ['max-line-length'];
    let disable = '';
    if (disableFlags.length) disable = `/* tslint:disable:${disableFlags.join(' ')} */\n`;
    if (header) header += '\n';
    content = `${disable}${header}${content}`;
  }
  fs.writeFileSync(file, content);
  out(`${file} generated`, TermColors.green);
}

/**
 * Makes the string commented, supports single/multi-line and empty output
 * @param input string (with new-line separation) or array of lines
 */
export function makeComment(input: string | string[]): string {
  if (Array.isArray(input)) input = input.join('\n');
  input = input.split('\n');

  let res = '';
  if (input.length > 1) {
    res = input.map(c => c ? ` * ${c}` : ' *').join('\n');
    res = `/**\n${res}\n */\n`;
  } else if (input.length && input[0]) {
    res = `/** ${input[0]} */\n`;
  }

  return res;
}

/**
 * Creates a unified header for all serialized files
 * @param schemaDef input schema header
 * @param swaggerUrlPath the path where the swagger ui definition can be found
 * @param version should API version info be included in generated files
 */
export function processHeader(schemaDef: any, omitVersion = false): string {
  const relevant = {
    info: schemaDef.info,
    path: schemaDef.host + (schemaDef.basePath || ''),
  };

  if (omitVersion) delete relevant.info.version;

  let res = JSON.stringify(relevant, null, conf.indentation);
  res = res.replace(/^[{}]$/gm, '');
  res = res.replace(/^\s*"[^"]+": [{"]/gm, '');
  res = res.replace(/["}],?$/gm, '');
  res = res.split('\n').filter(l => l.match(/\w/)).join('\n');
  return makeComment(res);
}

export enum TermColors {
  green = '\x1b[32m',
  red = '\x1b[31m',
  default = '\x1b[0m',
}

/**
 * Outputs text in optional color
 * @param text
 * @param color
 */
export function out(text: string | string[], color?: TermColors) {
  if (Array.isArray(text)) text = text.join('\n');
  if (color) text = `${color}${text}${TermColors.default}`;

  process.stdout.write(`${text}\n`);
}

/**
 * From others it filters out duplicate elements which are included in favoured.
 * Duplicates = same values for keys.
 * @param favoured
 * @param others
 * @param keys
 */
export function merge(favoured: any[], others: any[], ...keys: string[]): any[] {
  const othersFiltered = others
    .filter(elem => {
      return !favoured.find(subElem => keys
        .map((k: string) => elem[k] === subElem[k])
        .every(Boolean));
    });
  return favoured.concat(othersFiltered);
}
