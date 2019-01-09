
// Starts the electron app
require("@enmove/run-electron")(
    "http://localhost:8080/",
    require("./app.config.json")
);
