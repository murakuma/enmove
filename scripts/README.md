
# scripts

## `find-duplicated`

> Searchs all sub-packages and checks if any sub-packages has duplicated dependencies.

If you have no duplicated dependencies between sub-packages whatoever, all of the dependencies should be hoisted to the root `node_modules` by yarn. Therefore, sub-packages' `node_modules` directory doesn't exist or only contain a single `.bin` directory.

The script traverses all `./packages/*/node_modules/` directories to see whether one of `node_modules` contains any local dependencies that aren't hoisted due to the version inconsistency.

For example, `foo` sub-package depends on `external-lib@^1.0.0` and `bar` depends on `external-lib@^2.0.0`, chances are that either sub-package contain the another version of `external-lib` in its local `node_modules`. So by using this script, you can find the version inconisitency, which cause duplicated dependencies.

If one or more sub-packages have some duplicated dependencies, then check the version of dependencies in `package.json` and ensure that they're compatible with other sub-packages by upgrading the version of the dependency of the older one.

```sh
# Check to see if any duplicated dependencies found
$ node scripts/find-duplicated

# Check outdated dependencies and upgrade if necessary
$ yarn upgrade-interactive --latest

# Ensure all dependencies to be deduped (REQUIRED after `yarn upgrade`)
$ yarn-deduplicate yarn.lock
$ yarn install
```

> **NOTE**:
> You can install `yarn-deduplicate` with `yarn global add yarn-deduplicate`. [More information can be found here.](https://github.com/atlassian/yarn-deduplicate)
