"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStateOperationPrefix(methodName) {
    let operationPrefix = '';
    if (['put', 'patch'].indexOf(methodName) > -1) {
        operationPrefix = 'Update';
    }
    else if (['post'].indexOf(methodName) > -1) {
        operationPrefix = 'Create';
    }
    else {
        operationPrefix = 'Load';
    }
    return operationPrefix;
}
exports.getStateOperationPrefix = getStateOperationPrefix;
//# sourceMappingURL=shared-states.js.map