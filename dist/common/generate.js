"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTemplate = exports.addFormExtensions = exports.addUtils = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../utils");
function addUtils(dest) {
    writeTemplate((0, path_1.join)(dest, `utils.ts`));
}
exports.addUtils = addUtils;
function addFormExtensions(dest) {
    writeTemplate((0, path_1.join)(dest, `formArrayExtended.ts`));
    writeTemplate((0, path_1.join)(dest, `formMap.ts`));
}
exports.addFormExtensions = addFormExtensions;
function writeTemplate(dst) {
    const srcFileName = (0, path_1.join)(__dirname, 'templates', (0, path_1.basename)(dst));
    const dstFileName = (0, path_1.join)(dst);
    const content = (0, fs_1.readFileSync)(srcFileName).toString();
    (0, utils_1.writeFile)(dstFileName, content, undefined, 'ts', []);
}
exports.writeTemplate = writeTemplate;
//# sourceMappingURL=generate.js.map