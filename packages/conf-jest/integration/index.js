// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    ...require( "../" ),

    roots: ["<rootDir>/test/integration/"],

    // Override
    testMatch: [
        "**/*.test.+(ts|tsx|js)"
    ],
};