## Purpose

Generate minimalistic TypeScript API layer for Angular 4.3+ with full type reflection of backend model.
- Source: [swagger scheme](https://swagger.io/specification/)
- Destination: [Angular-cli](https://cli.angular.io/) based [Angular](https://angular.io/) app.

## Install

1. `npm i swagger-angular-generator --save-dev`
1. check usage via `./node_modules/.bin/swagger-angular-generator -h`

## Use

### Run generator

1. get the swagger scheme (typically at at http(s)://[server]/[app-path]/v2/api/api-docs)
1. save it to json file in input directory and optionally **format** it for better diff
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

When updating your code for new backend version, we recommend you to follow these steps:

1. `git diff` the changes
1. run `tsc` for immediate problems
1. adjust the code, solve problems
1. commit

### Use

In order to consume generated model, follow the steps **1-8** in the following example to use generated API model.

#### Usage in the service or component
```typescript
// 1. import used response types
import {ItemDto, PageDto} from '[relative-path-to-destination-directory]/model';
// 2. import used controller service and optionally param types
import {DataService, MethodParams} from '[relative-path-to-destination-directory]/api/DataService';

@Component({})
export class MyComponent implements OnInit {
  // 3. link response objects to generated API types
  public items: ItemDto[] = [];
  public page: PageDto;

  // 4. link request params to generated API types (all params are passed together in one object)
  private params: MethodParams = {
    page: 0,
    size: 10,
    sort: ['name:asc']
  };

  // 5. inject the service
  constructor(private dataService: DataService) {}

  public ngOnInit() {
    // 6. the returned observable is fully typed
    this.dataService
      .get(this.params)
      // 7. returned data are fully typed
      .subscribe(data => {
        // 8. assignments type-checked
        const {content, page} = data;
        this.items = content;
        this.page = page;
      });
  }
}
```

## Assumptions / limitations

1. swagger file is in [version 2](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) format, it must be json
1. each endpoint must have an `operationId` defined
1. `in: header` definitions are ignored
1. `get` and `delete` methods do not contain `body`

## Development

### Docker image

1. `docker build . -t swagger-angular-generator`
1. `docker-compose up -d`
1. `docker exec -it swagger-angular-generator bash`
1. `npm i`
1. `npm test`

### Pull requests are welcome!
