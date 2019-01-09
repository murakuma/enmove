
// Starts the electron app
require("@enmove/run-electron")(
    `file://${__dirname}/dist/index.html`,
    require("./app.config.json")
);