import {generate} from '../../src/generate';

class TestInitClass {
  createTestContent() {
    generate('swagger-files/unit-test-swagger.json', 'generated');
  }
}

const testInitClass = new TestInitClass();
testInitClass.createTestContent();
