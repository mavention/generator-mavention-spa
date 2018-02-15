module.exports = {
  Base: require('./lib/Base'),
  lit: require('./lib/json2js').lit,
  json: require('./lib/json2js').json,
  TestUtils: require('./lib/test-utils'),
  app: require.resolve('./generators/app'),
  component: require.resolve('./generators/component'),
  directive: require.resolve('./generators/directive'),
  filter: require.resolve('./generators/filter'),
  service: require.resolve('./generators/service')
};
