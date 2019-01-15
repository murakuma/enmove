
import configure from "@enmove/conf-storybook";

configure(
    // Automatically imports all files ending in *.stories.tsx
    require.context("../stories", true, /\.stories\.tsx$/),
    module
);
