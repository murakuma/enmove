// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    ...require( "../" ),

    setupTestFrameworkScriptFile: "<rootDir>/test/integration/setup.ts",
    testEnvironment: "enzyme",
};