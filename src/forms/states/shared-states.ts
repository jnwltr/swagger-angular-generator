export function getStateOperationPrefix(methodName: string) {
  let operationPrefix = '';

  if (['put', 'patch'].indexOf(methodName) > -1) {
    operationPrefix = 'Update';
  } else if (['post'].indexOf(methodName) > -1) {
    operationPrefix = 'Create';
  } else {
    operationPrefix = 'Load';
  }
  return operationPrefix;
}
