const { join, resolve } = require('path');

const { createTransformer } = require('babel-jest');

const config = require('../babel.config');

const packagePath = resolve('../');
// eslint-disable-next-line
const packageGlob = join(packagePath, '*');

module.exports = createTransformer({
  // babelrcRoots: packageGlob,
  ...config,
});
