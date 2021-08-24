const config = {
  // The directory where Jest should store its cached dependency information
  // cacheDirectory: 'C:\\Users\\User\\AppData\\Local\\Temp\\jest',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/io/*'
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   '\\\\node_modules\\\\'
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'node',
};

module.exports = config;
