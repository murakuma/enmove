
# enmove

> An opinionated boilerplate to develop a node/web/electron app in TypeScript.


## Motivation

The world of software engineering keeps growing rapidly, and the JavaScript community is not an exception. With the one of the most successful package manager, npm, we can build our own applications and libraries by integrating powerful modules in the wild. It provides us unlimited flexibility and customizability to develop our own product while the effort of adding those modules into our project is extremely small.

However, it gives a challenge that you have to choose the correct frameworks your product working with from almost infinite amount of combinations, which is quite tough decisions and can easily be overwhelming us.

**enmove** is super lazy boilerplate to scaffold projects and shamelessly gives you almost *no choices* of what you can use as frameworks.

enmove forces you to choose from following tools and libraries to make your product:

- Core
    - **TypeScript**
    - React
    - SASS
- Testing
    - Jest
    - dtslint (for type testing)
    - Enzyme (for react testing)
    - Storybook (for previewing components)
- Linter
    - TSLint
- Build system
    - Webpack (for bundling and web applications)
    - Electron (for desktop app)

Do you want to use something else in place of any items in the list? It means, perhaps, that you will require considerable amount of efforts to smoothly adopt this module to your project. If so, you may want to completely ignore this project, or fork this repo and customize it to suits your own needs and hopefully share it with us.


## Usage

To work with enmove, you need to know which target platform you may want to use. Then, choose the corresponding **hub package** from enmove packages. A hub package contains a handful dependencies, which is required to build your application along with enmove. So, just adding a one package to your project is enough to kick starting your new journey.

Currently, enmove provides following hub packages:

- [`@enmove/for-electron`](./packages/for-electron#readme)
- [`@enmove/for-node`](./packages/for-node#readme)
- [`@enmove/for-web`](./packages/for-web#readme)

Add a one of hub packages into your project as **devDependency**. For example:

```sh
$ npm install -D @enmove/for-electron
```


## Packages

As customizability grows, the number of combinations of required dependencies that you need to build your application also increases. enmove tries to remove unnecessary duplications across multiple scenarios, so it consists of a dozen of sub-packages to easily compose each other to produce the final *hub packages*.

To understand the concept of enmove, let's see how the hierarchy of enmove's sub-packages are established.

Basically, it consists of **three levels** of package hierarchy:

1. Hub packages
2. Block packages
3. Leaf packages
    - config presets, config generators, and utility functions

And here's the complete list of packages that published by this project:

- Hub packages
    - [`@enmove/for-electron`](./packages/for-electron#readme)
    - [`@enmove/for-node`](./packages/for-node#readme)
    - [`@enmove/for-web`](./packages/for-web#readme)
- Block packages
    - [`@enmove/with-electron`](./packages/with-electron#readme)
    - [`@enmove/with-jest`](./packages/with-jest#readme)
    - [`@enmove/with-jest-enzyme`](./packages/with-jest-enzyme#readme)
    - [`@enmove/with-storybook`](./packages/with-storybook#readme)
    - [`@enmove/with-ts`](./packages/with-ts#readme)
    - [`@enmove/with-tslint`](./packages/with-tslint#readme)
    - [`@enmove/with-webpack`](./packages/with-webpack#readme)
- Leaf packages
    - [`@enmove/conf-jest`](./packages/conf-jest#readme)
    - [`@enmove/conf-storybook`](./packages/conf-storybook#readme)
    - [`@enmove/conf-ts`](./packages/conf-ts#readme)
    - [`@enmove/conf-tslint`](./packages/conf-tslint#readme)
    - [`@enmove/conf-webpack`](./packages/conf-webpack#readme)
    - [`@enmove/run-electron`](./packages/run-electron#readme)

Let's take a closer look at each level.

### 1. Hub packages

The most highest level of enmove package hierarchy is the one **users actually install into their packages**, the hub packages.

A hub package has a set of dependencies to *block packages*. In other words, it consists of multiple block packages.

Their package names are start with `for-`, and describes which platform the hub package is suitable for.

### 2. Block packages

Block packages are essenses of enmove and they act like **glues that connect leaf packages and hub packages**. They can also contain external packages as  dependencies.

Their package names are start with `with-`, and indicates what kind of framework that becomes available to use after it is added as a dependency.

Unlike hub packages, users should not install any of block packages directly into their project.

### 3. Leaf packages

Leaf packages are the lowest level of configurations in enmove project.

The main difference to *block packages* is that, leaf packages can still be **refered by the user in their code**; the user may extend their `tsconfig.json` from the preset config lives in `@enmove/conf-ts` package to avoid unnecessary duplication of configurations.

Their package names are prefixed with other than `for-` (which is reserved for *hub packages*), and `with-` (which is reserved for *block packages*). For example, `conf-` indicates that the package expose a configuration object, or a single json file, as the entry point. And `run-electron` provides a function that creates an electron window for your application.

Similar to block packages, they're not installed manually by the user. However, as we mentioned, the user can refer to the content from leaf packages in their configuration files and scripts.
