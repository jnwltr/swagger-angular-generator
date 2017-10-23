import * as fs from 'fs';
import { basename } from 'path';
import * as conf from './conf';

/**
 * Recursively deletes the path
 * @param path
 * @param removeSelf whether to remove the directory itself or just its content
 */
export function emptyDir(path: string, removeSelf: boolean = false) {
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
 * Recursively copies the src to dest
 * @param src file or directory
 * @param dst directory
 */
export function copyDir(src: string, dst: string) {
  const target = `${dst}/${basename(src)}`;

  if (!fs.lstatSync(src).isDirectory()) fs.copyFileSync(src, target);
  else {
    if (fs.existsSync(target) &&
        fs.lstatSync(target).isDirectory()) {
      emptyDir(target, true);
    }

    fs.mkdirSync(target);
    fs.readdirSync(src).forEach(file => {
      copyDir(`${src}/${file}`, target);
    });
  }
}

/**
 * Indents the input
 * @param input string (with new-line separation) or array of lines
 * @param level of indentation, takes into account `conf` indentation setting
 */
export function indent(input: string | string[], level: number = 1): string {
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
export function writeFile(file: string, content: string, header: string): void {
  const disable = '/* tslint:disable:max-line-length */';
  content = `${disable}\n${header}\n${content}`;
  fs.writeFileSync(file, content);
  out(`${file} generated`, 'green');
}

/**
 * Makes the string commented, supports single/multi-line and empty output
 * @param input string (with new-line separation) or array of lines
 */
export function makeComment(input: string | string[]): string {
  if (typeof input === 'string') input = input.split('\n');

  let res = '';
  if (input.length > 1) {
    res = input.map(c => ` * ${c}`).join('\n');
    res = `/**\n${res}\n */\n`;
  } else if (input.length) {
    res = `/** ${input[0]} */\n`;
  }

  return res;
}

/**
 * Creates a unified header for all serialized files
 * @param schemaDef input schema header
 */
export function processHeader(schemaDef: any): string {
  const relevant = {
    info: schemaDef.info,
    path: schemaDef.host + schemaDef.basePath,
  };

  let res = JSON.stringify(relevant, null, conf.indentation);
  res = res.replace(/^[{}]$/gm, '');
  res = res.replace(/^\s*"[^"]+": [{"]/gm, '');
  res = res.replace(/["}],?$/gm, '');
  res = res.split('\n').filter(l => l.match(/\w/)).join('\n');

  return makeComment(res);
}

export type Color = 'green' | 'red';
export type TermColors = {[key in Color]: string};

export const termColors: TermColors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
};

/**
 * Outputs text in optional color
 * @param text
 * @param color
 */
export function out(text: string | string[], color?: Color) {
  if (Array.isArray(text)) text = text.join('\n');
  if (color) text = `${termColors[color]}${text}`;

  process.stdout.write(`${text}\n`);
}
