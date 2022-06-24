module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  //   transform: {
  //     '^.+\\.ts?$': 'ts-jest',
  //   },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@react-native|react-native|react-native-elements/*)'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  // setupFilesAfterEnv: '<rootDir>setup-tests.js',
};
