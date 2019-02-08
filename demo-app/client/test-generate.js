"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = require("../../src/generate");
class TestInitClass {
    createTestContent() {
        generate_1.generate('swagger-files/unit-test-swagger.json', 'generated', true, true, '/swagger');
    }
}
const testInitClass = new TestInitClass();
testInitClass.createTestContent();
//# sourceMappingURL=test-generate.js.map