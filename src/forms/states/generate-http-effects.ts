import * as path from 'path';
import {indent, writeFile} from '../../utils';
import {Config} from '../../generate';
import {Parameter} from '../../types';

export function GenerateHttpEffects(config: Config, name: string, simpleName: string, actionClassNameBase: string,
                                    actionTypeNameBase: string, formSubDirName: string, paramGroups: Parameter[]) {

  let content = '';
  content = getEffectsImports(content, name, actionTypeNameBase, actionClassNameBase);
  content = getEffectsStartDefinition(content, actionClassNameBase, name);
  content = getEffectDefinition(content, actionClassNameBase, actionTypeNameBase, name, simpleName, paramGroups);

  const effectsFileName = path.join(formSubDirName, `states`, `effects.ts`);
  writeFile(effectsFileName, content, config.header);
}

export function getEffectsImports(content: string, name: string, actionTypeNameBase: string, actionClassNameBase: string) {
  content += `import {Injectable} from '@angular/core';\n`;
  content += `import {Actions, Effect} from '@ngrx/effects';\n`;
  content += `import {of} from 'rxjs/observable/of';\n`;
  content += `import {catchError, map, switchMap} from 'rxjs/operators';\n`;
  content += `import {${name}Service} from '../../../../controllers/${name}';\n`;
  content += `import {${actionTypeNameBase}_START, ${actionClassNameBase}Error, ${actionClassNameBase}Start, ${actionClassNameBase}Success} from './actions';\n`;
  content += `\n`;
  return content;
}

export function getEffectsStartDefinition(content: string, actionClassNameBase: string, name: string) {
  content += `@Injectable()\n`;
  content += `export class ${actionClassNameBase}Effects {\n`;
  content += `\n`;
  content += indent(`constructor(\n`);
  content += indent(indent(`private actions: Actions,\n`));
  content += indent(indent(`private ${name.toLowerCase()}Service: ${name}Service,\n`));
  content += indent(`) {}\n`);
  content += indent(`\n`);
  content += `\n`;
  return content;
}

export function getEffectDefinition(content: string, actionClassNameBase: string, actionTypeNameBase: string,
                                    name: string, simpleName: string, paramGroups: Parameter[]) {
  const startActionPayloadDefinition = getStartActionPayloadDefinition(paramGroups);
  content += indent(`@Effect()\n`);
  content += indent(
      `${actionClassNameBase} = this.actions.ofType<${actionClassNameBase}Start>(${actionTypeNameBase}_START).pipe(\n`);
  content += indent(indent(
      `switchMap((action: ${actionClassNameBase}Start) => this.${name.toLowerCase()}Service.${simpleName}(${startActionPayloadDefinition}).pipe(\n`));
  content += indent(indent(indent(`map(${actionClassNameBase} => new ${actionClassNameBase}Success(${actionClassNameBase})),\n`)));
  content += indent(indent(indent(
      `catchError((error: Error) => of(new ${actionClassNameBase}Error(error.message))),\n`)));
  content += indent(`)));\n`);
  content += `}\n`;
  return content;
}

export function getStartActionPayloadDefinition(paramGroups: Parameter[]) {
  if (paramGroups.length) {
    return 'action.payload';
  } else {
    return '';
  }
}
