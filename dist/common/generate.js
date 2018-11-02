"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../utils");
function addUtils(dest) {
    writeTemplate(path_1.join(dest, `utils.ts`));
}
exports.addUtils = addUtils;
function addFormExtensions(dest) {
    writeTemplate(path_1.join(dest, `formArrayExtended.ts`));
    writeTemplate(path_1.join(dest, `formMap.ts`));
}
exports.addFormExtensions = addFormExtensions;
function writeTemplate(dst) {
    const srcFileName = path_1.join(__dirname, 'templates', path_1.basename(dst));
    const dstFileName = path_1.join(dst);
    const content = fs_1.readFileSync(srcFileName).toString();
    utils_1.writeFile(dstFileName, content, undefined, 'ts', []);
}
exports.writeTemplate = writeTemplate;
//# sourceMappingURL=generate.js.map