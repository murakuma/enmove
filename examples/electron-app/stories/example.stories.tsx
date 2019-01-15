
import React from "react";

import { storiesOf } from "@storybook/react";

// tslint:disable-next-line:no-var-requires
const { Button } = require("@storybook/react/demo");

storiesOf( "Button", module )
    .add( "with text", () => (
        <Button>Hello Button</Button>
    ) )
    .add( "with some emoji", () => (
        <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
    ) );
