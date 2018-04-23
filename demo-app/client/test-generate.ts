import {generate} from '../../src/generate';

class TestInitClass {
  createTestContent() {
    generate('swagger-files/unit-test-swagger.json', 'generated', true, true);
  }
}

const testInitClass = new TestInitClass();
testInitClass.createTestContent();
