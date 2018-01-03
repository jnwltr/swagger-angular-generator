import * as conf from '../../conf';
import * as path from 'path';
import {indent, writeFile} from '../../utils';
import {Config} from '../../generate';

export function GenerateHttpEffects(config: Config, name: string, dashedName: string, simpleName: string,
                                    actionClassNameBase: string, actionTypeNameBase: string) {

  let content = '';
  content = getEffectsImports(content, name);
  content = getEffectsStartDefinition(content, actionClassNameBase, name);
  content = getEffectDefinition(content, actionClassNameBase, actionTypeNameBase, name, simpleName);

  const effectsFileName = path.join(config.dest, conf.formDir + `/${dashedName}/states`, `effects.ts`);
  writeFile(effectsFileName, content, config.header);
}

export function getEffectsImports(content: string, name: string) {
  content += `import {Injectable} from '@angular/core';\n`;
  content += `import {Actions, Effect} from '@ngrx/effects';\n`;
  content += `import {of} from 'rxjs/observable/of';\n`;
  content += `import {catchError, map, switchMap} from 'rxjs/operators';\n`;
  content += `import {${name}Service} from '../../../controllers/${name}';\n`;
  content += `import {CREATE_ORDER_ORDER_START, CreateOrderOrderError, CreateOrderOrderStart, CreateOrderOrderSuccess} from './actions';\n`;
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
                                    name: string, simpleName: string) {
  content += indent(`@Effect()\n`);
  content += indent(
      `${actionClassNameBase} = this.actions.ofType<${actionClassNameBase}Start>(${actionTypeNameBase}_START).pipe(\n`);
  content += indent(indent(
      `switchMap((action: ${actionClassNameBase}Start) => this.${name.toLowerCase()}Service.${simpleName}(action.payload).pipe(\n`));
  content += indent(indent(indent(`map(${actionClassNameBase} => new ${actionClassNameBase}Success(${actionClassNameBase})),\n`)));
  content += indent(indent(indent(
      `catchError((error: Error) => of(new ${actionClassNameBase}Error(error.message))),\n`)));
  content += indent(`)));\n`);
  content += `}\n`;
  return content;
}

//
// @Injectable()
// export class CareerLandingPageEffects {
//
//     constructor(private actions: Actions,
//                 ) {
//     }
//
//     /* Position List */
//     @Effect()
//     loadPositionList = this.actions.ofType<LoadPositionList>(LOAD_POSITION_LIST).pipe(
//         switchMap((action: LoadPositionList) => this.careersService.positions(action.payload).pipe(
//             map(positions => new LoadPositionListSuccess(positions)),
//             catchError((error: Error) => of(new LoadPositionListError(error.message)))
//         )));
// }
