
# Examples

## Manual tests

Example packages in this directory can be used as manual tests for `@enmove` packages. Consider to perform following tasks before publishing `@enmove`:

- [ ] `cd examples/electron-app`
  - [ ] `yarn start`
    - The electron app loads a page from webpack dev server
  - [ ] `yarn storybook`
    - The storybook page is opened on web browser
  - [ ] `yarn lint`
    - Successfully lints without any errors
  - [ ] `yarn build`
    - Webpack builds the electron app to `dist/`
  - [ ] `yarn electron`
    - Launches electron app that loads a page from `dist/`
- [ ] `cd examples/library`
  - [ ] `yarn test`
    - Run all test code including integration- and type-tests
  - [ ] `yarn build`
    - tsc builds the library code with type declarations to `dist/`
