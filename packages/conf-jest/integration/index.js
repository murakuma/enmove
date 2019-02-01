// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    ...require( "../" ),

    roots: ["<rootDir>/test/integration/"],

    moduleNameMapper: {
        "@src/(.*)": "<rootDir>/src/$1",
    },

    // Override
    testMatch: [
        "**/*.test.+(ts|tsx|js)"
    ],
};