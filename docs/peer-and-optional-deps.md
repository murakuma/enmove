
# Peer and optional dependencies

enmove is comprised of a dozen of external modules that help us to build our applications, such as TypeScript, webpack, and jest. Some of those tools may contain **peer dependencies**, which must be added by the *dependent package*, otherwise we would end up getting npm warnings that tell us some of peer dependencies are missing (**unmet peer dependency warning**).

Sometimes installing missing peer dependencies to the dependent package is reasonable, but sometimes not. If we refuse installing those dependencies, we get npm warnings. To avoid this, we gracefully use **optional dependencies** to hide this warnings instead of adding duplicated package dependencies in ascestors.

## Unmet peer dependencies

Here is an example of *unmet peer depedency warning* message:

```sh
warning "webpack-cli@3.2.1" has unmet peer dependency "webpack@4.x.x"
```

Let's say, you have a package (dependent) that depends on `webpack-cli` (dependency). And `webpack-cli` depends on `webpack` (peer dependency of the dependency). In general, you add `webpack` as a dependency along with `webpack-cli` so both are always installed. However, sometimes you want to imply that `webpack` should be added by one of the other dependencies:

```
Your package
├── webpack-cli
│   ├── (peerDep) webpack
│   └── ...
├── Your helper package
│   ├── webpack
│   └── ...
└── ...
```

Since `webpack` is already added by your helper package, we want to avoid unnecessarily adding `webpack` in our package. Unfortunately, npm still warns you that there's unmet peer dependencie because unmet peer dependencies **cannot be resolved by any sibling, aunts/uncles, or cousins** of the package even if they contains them.

And similar cases appear in enmove project:

```
@enmove/for-node
├── @enmove/with-ts
│   ├── typescript
│   └── ...
├── @enmove/with-tslint
│   ├── tslint
│   │   ├── (peerDep) typescript
│   │   └── ...
│   └── ...
└── ...
```

`typescript` is installed in `@enmove/for-node` package because of the presence of `@enmove/with-ts`. As you may be aware, it still warns us that `tslint` wants you to add `typescript` on somewhere that directly or indirectly depends on `@enmove/with-tslint`.

### Solution 1: Adding a dependency in one of the anscestors

```
@enmove/for-node
├── @enmove/with-ts
│   ├── typescript
│   └── ...
├── @enmove/with-tslint
│   ├── tslint
│   │   ├── (peerDep) typescript
│   │   └── ...
│   ├── (peerDep) **typescript**
│   └── ...
├── **typescript**
└── ...
```

As we discussed earilier, this requires us to adding `typescript` dependency on two or more places, which we want to prevent from happening.

### Solution 2: Adding an optional dependency

```
@enmove/for-node
├── @enmove/with-ts
│   ├── typescript
│   └── ...
├── @enmove/with-tslint
│   ├── tslint
│   │   ├── (peerDep) typescript
│   │   └── ...
│   ├── (optionalDep) **typescript**
│   └── ...
└── ...
```

Here's a quick summary of optional dependencies:

- They can satisfy the peer dependencies
- They will be installed by default
- They can be skipped to be installed (so they are called *optional*)
- Even if the user have **avoided installing optional packages**, they still **satisfy the peer dependencies**

We use this technique to suppress unmet peer dependency warnings.


## Skip optional dependencies to be installed

Users can optionally skip installation of optional dependencies that are never added as normal dependencies in any enmove package at all, e.g., `@babel/core`: 

```sh
# with npm
$ npm install -D @enmove/for-web --no-optional

# with yarn
$ yarn add -D @enmove/for-web --ignore-optional
```


## List of optional dependencies

Here is a quick reference of which enmove modules have optional dependencies that resolve peer dependencies by the external modules.

Please note that there are three type of optional dependencies in enmove packages:

- **Added by other enmove package**:
    - Dependencies added by one of the other enmove packages.
- **Peer dependencies**:
    - Dependencies that should be added by the user.
- **Optional**:
    - Even though this is a peer dependency, we can omit this package because some of features that depend on it are not meant to be always used in our build system (e.g., babel).

| `@enmove`          | Added by other             | Peer deps               | Optional                                             |
|--------------------|----------------------------|-------------------------|------------------------------------------------------|
| `conf-storybook`   | `webpack`                  | `react`<br/>`react-dom` | `@babel/core`<br/>`@emotion/core`<br/>`babel-loader` |
| `conf-tslint`      | `tslint`<br/>`typescript`  |                         | `rxjs`                                               |
| `conf-webpack`     | `typescript`<br/>`webpack` |                         |                                                      |
| `with-jest-enzyme` |                            | `react`<br/>`react-dom` |                                                      |
| `with-tslint`      | `typescript`               |                         |                                                      |
