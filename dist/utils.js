"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const conf = require("./conf");
/**
 * Checks if directory exists
 * @param path
 */
function doesDirExist(path) {
    try {
        return fs.statSync(path).isDirectory();
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        }
        else {
            throw e;
        }
    }
}
/**
 * Creates directory based on provided path
 * @param path
 */
function createDir(path) {
    if (!doesDirExist(path))
        fs.mkdirSync(path);
}
exports.createDir = createDir;
/**
 * Recursively deletes the path and optionally creates self as an empty directory
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
function writeFile(file, content, header = '', fileType = 'ts', disableFlags) {
    if (fileType === 'ts') {
        if (!disableFlags)
            disableFlags = ['max-line-length'];
        let disable = '';
        if (disableFlags.length)
            disable = `/* tslint:disable:${disableFlags.join(' ')} */\n`;
        if (header)
            header += '\n';
        content = `${disable}${header}${content}`;
    }
    fs.writeFileSync(file, content);
    out(`${file} generated`, TermColors.green);
}
exports.writeFile = writeFile;
/**
 * Makes the string commented, supports single/multi-line and empty output
 * @param input string (with new-line separation) or array of lines
 */
function makeComment(input) {
    if (Array.isArray(input))
        input = input.join('\n');
    input = input.split('\n');
    let res = '';
    if (input.length > 1) {
        res = input.map(c => c ? ` * ${c}` : ' *').join('\n');
        res = `/**\n${res}\n */\n`;
    }
    else if (input.length && input[0]) {
        res = `/** ${input[0]} */\n`;
    }
    return res;
}
exports.makeComment = makeComment;
/**
 * Creates a unified header for all serialized files
 * @param schemaDef input schema header
 * @param swaggerUrlPath the path where the swagger ui definition can be found
 * @param version should API version info be included in generated files
 */
function processHeader(schemaDef, omitVersion = false) {
    const relevant = {
        info: schemaDef.info,
        path: schemaDef.host + (schemaDef.basePath || ''),
    };
    if (omitVersion)
        delete relevant.info.version;
    let res = JSON.stringify(relevant, null, conf.indentation);
    res = res.replace(/^[{}]$/gm, '');
    res = res.replace(/^\s*"[^"]+": [{"]/gm, '');
    res = res.replace(/["}],?$/gm, '');
    res = res.split('\n').filter(l => l.match(/\w/)).join('\n');
    return makeComment(res);
}
exports.processHeader = processHeader;
var TermColors;
(function (TermColors) {
    TermColors["green"] = "\u001B[32m";
    TermColors["red"] = "\u001B[31m";
    TermColors["default"] = "\u001B[0m";
})(TermColors = exports.TermColors || (exports.TermColors = {}));
/**
 * Outputs text in optional color
 * @param text
 * @param color
 */
function out(text, color) {
    if (Array.isArray(text))
        text = text.join('\n');
    if (color)
        text = `${color}${text}${TermColors.default}`;
    process.stdout.write(`${text}\n`);
}
exports.out = out;
/**
 * From others it filters out duplicate elements which are included in favoured.
 * Duplicates = same values for keys.
 * @param favoured
 * @param others
 * @param keys
 */
function merge(favoured, others, ...keys) {
    const othersFiltered = others
        .filter(elem => {
        return !favoured.find(subElem => keys
            .map((k) => elem[k] === subElem[k])
            .every(Boolean));
    });
    return favoured.concat(othersFiltered);
}
exports.merge = merge;
//# sourceMappingURL=utils.js.map