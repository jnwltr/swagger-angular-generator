import * as path from 'path';
import {Config} from '../../generate';
import {Parameter} from '../../types';
import {indent, writeFile} from '../../utils';

export function GenerateHttpEffects(config: Config, name: string, simpleName: string, actionClassNameBase: string,
                                    formSubDirName: string, paramGroups: Parameter[]) {
  let content = '';
  content += getEffectsImports(name);
  content += getEffectsStartDefinition(actionClassNameBase);
  content += getEffectDefinition(actionClassNameBase, name, simpleName, paramGroups);
  content += getConstructorDefinition(name);
  content += `}\n`;

  const effectsFileName = path.join(formSubDirName, `states`, `effects.ts`);
  writeFile(effectsFileName, content, config.header);
}

function getEffectsImports(name: string) {
  let res = `import {Injectable} from '@angular/core';\n`;
  res += `import {Actions, Effect} from '@ngrx/effects';\n`;
  res += `import {of} from 'rxjs/observable/of';\n`;
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

function getEffectDefinition(actionClassNameBase: string, name: string, simpleName: string, paramGroups: Parameter[]) {
  const startActionPayloadDefinition = getStartActionPayloadDefinition(paramGroups);

  let res = indent(`@Effect()\n`);
  res += indent(`${actionClassNameBase} = this.storeActions.ofType<actions.Start>(actions.Actions.START).pipe(\n`);
  res += indent(
    `switchMap((action: actions.Start) => ` +
    `this.${name.toLowerCase()}Service.${simpleName}(${startActionPayloadDefinition}).pipe(\n`,
    2);
  res += indent(`map(result => new actions.Success(result)),\n`, 3);
  res += indent(`catchError((error: Error) => of(new actions.Error(error.message))),\n`, 3);
  res += indent(`)));\n`);
  res += '\n';

  return res;
}

function getStartActionPayloadDefinition(paramGroups: Parameter[]) {
  if (paramGroups.length) return 'action.payload';
  return '';
}
