
import React from "react";
import ReactDOM from "react-dom";

import Counter from "./components/Counter";

ReactDOM.render(
    <div>
        Hello, electron!
        <Counter />
    </div>,
    document.getElementById("root")
);
