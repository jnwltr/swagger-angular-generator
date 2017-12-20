import {generate} from '../../src/generate';

class TestInitClass {

    createTestContent() {
        generate('test-swaggers/test-swagger.json', 'generated');
    }
}

const testInitClass = new TestInitClass();
testInitClass.createTestContent();
