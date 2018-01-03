import {ControllerMethod} from '../../requests/requests.models';

export function getStateOperationPrefix(methods: ControllerMethod[]) {
  let operationPrefix = '';

  if (['put', 'patch'].indexOf(methods[0].methodName) > -1) {
    operationPrefix = 'Update';
  } else if (['post'].indexOf(methods[0].methodName) > -1) {
    operationPrefix = 'Create';
  } else {
    operationPrefix = 'Load';
  }
  return operationPrefix;
}
