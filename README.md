# WIP: do not use, yet

(RC tbd in a couple of days)

## Install

1. `npm i swagger-angular-generator --save-dev`
1. check usage via `./node_modules/.bin/swagger-angular-generator -h`

## Use

### Run generator

1. get the swagger scheme at http(s)://domain/[path]/v2/api/api-docs
1. save it to json file in input directory and **format** it
1. run via
    1. **directly** `./node_modules/.bin/swagger-angular-generator`
    1. **as module** `swagger-angular-generator` package, `npm run generate`
        ```javascript
        "script": {
          "generate": "swagger-angular-generator -s src/api/scheme.json -d src/api/generated"
          ...
        }
        ```
    1. or **programatically** as a method invocation
        ```typescript
        import {generate} from 'swagger-angular-generator';
        // or using CommonJS loader
        const {generate} = require('swagger-angular-generator');

        generate('conf/api/api-docs.json', 'src/api');
        ```

The resulting API layer contains the following structure in the destination directory:

1. `def` directory stores all response interfaces and enums
1. `model.ts` file reexports all of them together for a simple access
1. `api` directory stores services devided by controllers containing all API methods

When updating your code for new backend version, follow these steps:

1. `git diff` the changes
1. run `tsc` for immediate problems
1. adjust the code, solve problems
1. commit

### Use

In order to consume generated model, follow the steps **1-9** in the following example to use generated API model.

#### Getting ready for injection in the module

```typescript
// 1. add providers to your module, e.g.
import {ApiService} from '../api/services/api';
import {AuthService} from '../api/services/auth';

@NgModule({providers: [ApiService, AuthService, ...], ...})
export class AppModule {}
```

#### Usage in the service or component
```typescript
// 2. import used response types
import {ItemDto, PageDto} from '[relative-path-to-destination-directory]/model';
// 3. import used controller service and optionally param types
import {DataService, MethodParams} from '[relative-path-to-destination-directory]/api/DataService';

@Component({
  // 4. enable injection
  providers: [DataService]
})
export class MyComponent implements OnInit {
  // 5. link response objects to generated API types
  public items: ItemDto[] = [];
  public page: PageDto;

  // 6. link request params to generated API types (all params are passed together in one object)
  private params: MethodParams = {
    page: 0,
    size: 10,
    sort: ['name:asc']
  };

  // 7. inject the service
  constructor(private dataService: DataService) {}

  public ngOnInit() {
    // 8. the returned observable is fully typed
    this.dataService
      .get(this.params)
      // 9. returned data are fully typed
      .subscribe(data => {
        // 10. assignments type-checked
        const {content, page} = data;
        this.items = content;
        this.page = page;
      });
  }
}
```

## Known limitations / specifics

1. ignoring params (on purpose)
    1. `header` globally
    1. `body` for `get` and `delete`
