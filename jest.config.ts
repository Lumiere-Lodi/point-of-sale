import path from 'path';
const rootDirectory = path.resolve(__dirname);

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 70,
      function: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', `${rootDirectory}/src/config`, `${rootDirectory}/src/constants`],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@server(.*)$': `${rootDirectory}/src$1`,
    '@config(.*)$': `${rootDirectory}/src/config$1`,
    '@tests(.*)$': `${rootDirectory}/__tests__$1`,
  },
  reporters: [
    'default',
    [
      path.resolve(__dirname, 'node_modules', 'jest-html-reporter'),
      {
        pageTitle: 'Demo test Report',
        outputPath: 'test-report.html',
      },
    ],
  ],
  rootDir: rootDirectory,
  roots: [rootDirectory],
  setupFilesAfterEnv: [`${rootDirectory}/__tests__/setup.ts`],
  testPathIgnorePatterns: [
    '<rootDir>/build',
    `${rootDirectory}/__tests__/mock`,
    `${rootDirectory}/__tests__/fixtures`,
    `${rootDirectory}/__tests__/setup.ts`,
    `${rootDirectory}/src/controllers/submit-data/profiles/.*/__tests__/__mock__`,
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      },
    ],
  },
  testRegex: [
    '((/__tests__/.*)|(\\.|/)(test|spec))\\.tsx?$',
    '((/src/controllers/submit-data/profiles/.*/__tests__/.*)|(\\.|/)(test|spec))\\.tsx?$',
  ],
};
