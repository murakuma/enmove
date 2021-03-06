
# CHANGELOG

## 1.0.0-alpha.3 (2019-02-01)

### Features

* Updated outdated dependencies
* **with-tslint**: Add `dtslint` to run type tests
* **conf-jest**: Add `moduleNameMapper` to import `@src/*` from integration tests

### Bug Fixes

* **conf-webpack**: Fix webpack config for AutoDll to inherit `mode` and `context` on `vendor` bundle
* **with-jest-enzyme**: Fix that `jest-enzyme` is missing


## 1.0.0-alpha.2 (2019-01-15)

### Bug Fixes

* Fix unmet peer dependency on `with-tslint`
* Fix webpack config to properly apply the current target to `vendor.js` dll as well
* Fix `conf-storybook` to make it possible to import `configure` function in `.storybook/config.ts` with the webpack config generated by `conf-webpack`


## 1.0.0-alpha.1 (2019-01-15)

### Features

* Add new `conf-webpack` package in place of `conf-gen-webpack`
* Add storybook integration to `for-node` and `for-electron`

### Bug Fixes

* Fix dependencies to get rid of unmet peer dependency warnings
* Fix default exports on `run-electron` to properly expose its type declaration

### BREAKING CHANGES

* `conf-gen-webpack` has been removed in favor of `conf-webpack`


## 1.0.0-alpha.0 (2019-01-10)

Initial release.
