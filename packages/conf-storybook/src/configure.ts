
import Module from "module";

import { configure as sbConfigure } from "@storybook/react";

type WebpackRequireContext = ReturnType<typeof require.context>;

/**
 * Loads stories from the webpack require context.
 *
 * This is the lazier version of `configure` function from `@storybook/react`.
 * By giving a webpack require context, which contains the file references to
 * your stories `.tsx` files, it automatically register them to storybook.
 *
 * @see https://webpack.js.org/guides/dependency-management/#require-context
 *
 * @param req The webpack require context object of stories.
 * @param mod The module object.
 */
export function configure( req: WebpackRequireContext, mod: Module ) {
    const loadStories = () => {
        req.keys().forEach( req );
    };

    sbConfigure( loadStories, mod );
}
