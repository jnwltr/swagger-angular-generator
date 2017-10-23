"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const conf = require("./conf");
/**
 * Recursively deletes the path
 * @param path
 * @param removeSelf whether to remove the directory itself or just its content
 */
function emptyDir(path, removeSelf = false) {
    if (!fs.existsSync(path)) {
        if (!removeSelf)
            fs.mkdirSync(path);
        return;
    }
    fs.readdirSync(path).forEach(file => {
        const current = `${path}/${file}`;
        if (fs.lstatSync(current).isDirectory())
            emptyDir(current, removeSelf);
        else
            fs.unlinkSync(current);
    });
    if (removeSelf)
        fs.rmdirSync(path);
}
exports.emptyDir = emptyDir;
/**
 * Recursively copies the src to dest
 * @param src file or directory
 * @param dst directory
 */
function copyDir(src, dst) {
    const target = `${dst}/${path_1.basename(src)}`;
    if (!fs.lstatSync(src).isDirectory())
        fs.copyFileSync(src, target);
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
exports.copyDir = copyDir;
/**
 * Indents the input
 * @param input string (with new-line separation) or array of lines
 * @param level of indentation, takes into account `conf` indentation setting
 */
function indent(input, level = 1) {
    if (Array.isArray(input))
        input = input.join('\n');
    let res;
    res = input.replace(/^/gm, ' '.repeat(level * conf.indentation));
    res = res.replace(/^\s+$/gm, '');
    return res;
}
exports.indent = indent;
/**
 * Serializes the content to the file including global header
 * @param file
 * @param content
 */
function writeFile(file, content, header) {
    content = `${header}\n${content}`;
    fs.writeFileSync(file, content);
    out(`${file} generated`, 'green');
}
exports.writeFile = writeFile;
/**
 * Makes the string commented, supports single/multi-line and empty output
 * @param input string (with new-line separation) or array of lines
 */
function makeComment(input) {
    if (typeof input === 'string')
        input = input.split('\n');
    let res = '';
    if (input.length > 1) {
        res = input.map(c => ` * ${c}`).join('\n');
        res = `/**\n${res}\n */\n`;
    }
    else if (input.length) {
        res = `/** ${input[0]} */\n`;
    }
    return res;
}
exports.makeComment = makeComment;
/**
 * Creates a unified header for all serialized files
 * @param schemaDef input schema header
 */
function processHeader(schemaDef) {
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
exports.processHeader = processHeader;
exports.termColors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
};
/**
 * Outputs text in optional color
 * @param text
 * @param color
 */
function out(text, color) {
    if (Array.isArray(text))
        text = text.join('\n');
    if (color)
        text = `${exports.termColors[color]}${text}`;
    process.stdout.write(`${text}\n`);
}
exports.out = out;
//# sourceMappingURL=utils.js.map