module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/factories/", "/support/"],
  setupFilesAfterEnv: ["./__tests__/support/jestSetup.ts"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
