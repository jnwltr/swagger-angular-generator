## Purpose

Generate minimalistic TypeScript API layer for Angular 4.3+ with full type reflection of backend model.
- Source: [swagger scheme](https://swagger.io/specification/)
- Destination: [Angular-cli](https://cli.angular.io/) based [Angular](https://angular.io/) app.

## Install

1. `npm i swagger-angular-generator --save-dev`
1. check usage via `./node_modules/.bin/swagger-angular-generator -h`

## Use

### Run generator

1. get the swagger json file and save it to input directory
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


## Presumptions / limitations

1. swagger file is in [version 2](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) format, it must be json
1. each endpoint must have a `operationId` defined with its name
1. `in: header` definitions are ignored
1. `get` and `delete` methods do not contain `body`

## Development

* Pull requests are welcomed!

### Docker image

1. `docker build . -t swagger-angular-generator`
1. `docker run -u $(id -u) -it -v "$PWD":/code swagger-angular-generator bash`
1. `npm install`