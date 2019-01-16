import * as path from 'path';
import {Config} from '../../generate';
import {Parameter} from '../../types';
import {indent, writeFile} from '../../utils';

export function generateHttpEffects(config: Config, name: string, simpleName: string, actionClassNameBase: string,
                                    formSubDirName: string, paramGroups: Parameter[]) {
  let content = '';
  content += getEffectsImports(name);
  content += getEffectsStartDefinition(actionClassNameBase);
  content += getEffectDefinition(actionClassNameBase, name, simpleName, paramGroups.length >= 1);
  content += getConstructorDefinition(name);
  content += `}\n`;

  const effectsFileName = path.join(formSubDirName, `states`, `effects.ts`);
  writeFile(effectsFileName, content, config.header);
}

function getEffectsImports(name: string) {
  let res = `import {HttpErrorResponse} from '@angular/common/http';\n`;
  res += `import {Injectable} from '@angular/core';\n`;
  res += `import {Actions, Effect, ofType} from '@ngrx/effects';\n`;
  res += '\n';
  res += `import {of} from 'rxjs';\n`;
  res += '\n';
  res += `import {catchError, map, switchMap} from 'rxjs/operators';\n`;
  res += `import {${name}Service} from '../../../../controllers/${name}';\n`;
  res += `import * as actions from './actions';\n`;
  res += `\n`;

  return res;
}

function getEffectsStartDefinition(actionClassNameBase: string) {
  let res = `@Injectable()\n`;
  res += `export class ${actionClassNameBase}Effects {\n`;

  return res;
}

function getConstructorDefinition(name: string) {
  let res = `constructor(\n`;
  res += indent(`private storeActions: Actions,\n`);
  res += indent(`private ${name.toLowerCase()}Service: ${name}Service,\n`);
  res += `) {}\n\n`;

  return indent(res);
}

function getEffectDefinition(actionClassNameBase: string, name: string, simpleName: string, hasParams: boolean) {
  const startActionPayloadDefinition = getStartActionPayloadDefinition(hasParams);

  let res = indent(`@Effect()\n`);
  res += indent(`${actionClassNameBase} = this.storeActions.pipe(\n`);
  res += indent(`ofType<actions.Start>(actions.Actions.START),\n`, 2);
  const actionParam = hasParams ? 'action: actions.Start' : '';
  res += indent(
    `switchMap((${actionParam}) => ` +
    `this.${name.toLowerCase()}Service.${simpleName}WithResponse(${startActionPayloadDefinition})\n`, 2);
  res += indent(`.pipe(\n`, 3);
  res += indent(`map(result => new actions.Success(result)),\n`, 4);
  res += indent(`catchError((error: HttpErrorResponse) => of(new actions.Error(error))),\n`, 4);
  res += indent(`),\n`, 3);
  res += indent(`),\n`, 2);
  res += indent(`);\n`);
  res += '\n';

  return res;
}

function getStartActionPayloadDefinition(hasParams: boolean) {
  if (hasParams) return 'action.payload';
  return '';
}
