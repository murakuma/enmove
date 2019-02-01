
# scripts

## `find-duplicated`

> Searchs all sub-packages and checks if any sub-packages has duplicated dependencies.

If you have no duplicated dependencies between sub-packages whatoever, all of the dependencies should be hoisted to the root `node_modules` by yarn. Therefore, sub-packages' `node_modules` directory doesn't exist or only contain a single `.bin` directory.

The script traverses all `./packages/*/node_modules/` directories to see whether one of `node_modules` contains any local dependencies that aren't hoisted due to the version inconsistency.

For example, `foo` sub-package depends on `external-lib@^1.0.0` and `bar` depends on `external-lib@^2.0.0`, chances are that either sub-package contain the another version of `external-lib` in its local `node_modules`. So by using this script, you can find the version inconisitency, which cause duplicated dependencies.

If one or more sub-packages have some duplicated dependencies, then check the version of dependencies in `package.json` and ensure that they're compatible with other sub-packages by upgrading the version of the dependency of the older one.
