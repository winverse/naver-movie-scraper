/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const config = {
  clearMocks: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
  rootDir: './',
  modulePaths: ['./'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

module.exports = config;
