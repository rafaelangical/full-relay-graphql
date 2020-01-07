// eslint-disable-next-line
jest.mock('../src/relay/Environment', () => {
  const {createMockEnvironment} = require('relay-test-utils');
  return createMockEnvironment();
});
