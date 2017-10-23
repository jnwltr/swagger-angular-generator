# WIP: do not use, yet

(RC tbd in a couple of days)

## Install

- `npm i swagger-angular-generator --save-dev`
- check usage via `./node_modules/.bin/swagger-angular-generator -h`

## Use

- get the scheme at http(s)://domain//api/api-docs
- and save to json file in input directory
- run via
  - directly `./node_modules/.bin/swagger-angular-generator`
  - as module `swagger-angular-generator` package, `npm run generate`
    ```javascript
    "script": {
      "generate": "swagger-angular-generator -s src/api/scheme.json -d src/api/generated"
      ...
    }
    ```
  - programatically as a method invocation
    ```typescript
    import {generate} from 'swagger-angular-generator';
    // or in
    const {generate} = require('swagger-angular-generator');

    generate('conf/api/api-docs.json', 'src/api');
    ```
