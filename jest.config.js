require('dotenv').config({ path: '.env.test' });

module.exports = {
  testMatch: ['<rootDir>/tests/**/*.test.js', '<rootDir>/src/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverage: true
};
