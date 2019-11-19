
import React from "react";

import { storiesOf } from "@storybook/react";

import Counter from "@src/components/Counter";

storiesOf( "Counter", module )
    .add( "Default", () => (
        <Counter />
    ) )
    .add( "Custom initial value", () => (
        <Counter initialValue={42} />
    ) )
    .add( "Custom Min/Max", () => (
        <Counter minValue={5} maxValue={10} />
    ) )
    .add( "onUpdate()", () => (
        // tslint:disable-next-line: jsx-no-lambda
        <Counter onUpdate={value => console.log( "[OnUpdate] Current value: " + value )} />
    ) );
