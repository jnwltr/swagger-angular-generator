## Purpose

Generate minimalistic TypeScript API layer for Angular with full type reflection of backend model.
- Source: [swagger scheme](https://swagger.io/specification/)
- Destination: [Angular-cli](https://cli.angular.io/) based [Angular](https://angular.io/) app.

## Install

1. `npm i swagger-angular-generator --save-dev`
1. check usage via `./node_modules/.bin/swagger-angular-generator -h`

## Use

### Run generator

1. get the swagger scheme (typically at http(s)://[server]/[app-path]/v2/api/api-docs)
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
1. `controllers` directory stores services containing all API methods devided by controllers

When updating your code for new backend version, we recommend you to follow these steps:

1. `git diff` the changes
1. run `tsc` for immediate problems
1. adjust the code, solve problems
1. commit

### Use

In order to consume generated model, follow the steps **1-9** in the following example to use generated API model.

#### Usage in the service or component
```typescript
// 1. import used response types
import {ItemDto, PageDto} from '[relative-path-to-destination-directory]/model';
// 2. import used controller service and optionally param types
import {DataService, MethodParams} from '[relative-path-to-destination-directory]/api/DataService';

@Component({
  ...
  // 3. make the service injectable
  providers: [DataService],
})
export class MyComponent implements OnInit {
  // 4. link response objects to generated API types
  public items: ItemDto[] = [];
  public page: PageDto;

  // 5. link request params to generated API types (all params are passed together in one object)
  private params: MethodParams = {
    page: 0,
    size: 10,
    sort: ['name:asc']
  };

  // 6. inject the service
  constructor(private dataService: DataService) {}

  public ngOnInit() {
    // 7. the returned observable is fully typed
    this.dataService
      .get(this.params)
      // 8. returned data are fully typed
      .subscribe(data => {
        // 9. assignments type-checked
        const {content, page} = data;
        this.items = content;
        this.page = page;
      });
  }
}
```

## Assumptions / limitations

1. swagger file is in [version 2](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) format, it must be json
1. each endpoint must have a `tags` attribute defined. In addition, there must be exactly one tag defined.
The http methods are grouped to services based on the tags, i.e. if two methods have tag "order", both will be
generated inside Order.ts
1. `in: header` definitions are ignored
1. `get` and `delete` methods do not contain `body`
1. swagger file should contain values for the keys `host` and `basePath` so that each generated service method
can contain a link to the swagger UI method reference, e.g. `http://example.com/swagger/swagger-ui.html#!/Order/Order`


## Development

* at least node 8 is needed

### Docker image

1. `docker build . -t swagger-angular-generator`
1. `docker run -u $(id -u) -it -v "$PWD":/code swagger-angular-generator bash`
1. `npm i`

### Testing

#### How the testing works

* tests are written in the demo-app
* the test swagger files can be found in demo-app/client/test-swaggers
* upon these swagger files, interfaces and services are generated
* the generated services are manually imported to the app.module.ts
* unit tests can be found in demo-app/client/src/tests

#### Running the tests

1. `cd demo-app/client`
1. `npm run generate`
1. `npm run test`

or instead of step 2 and 3 run: `npm run testci`

## TODO

- forms - add select fields for eums and checkboxes for booleans
- forms do not currently work for nested data structures
- come up with a way how to define inital states values
- State initerfaces and initial values move to separate importable file
- the State interface definition should be equal to the response types
- reducers should use such states
- this will make possible to have create/update/get methods share the same store attributes

---

### _Pull requests are welcome!_
