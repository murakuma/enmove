
# enmove

The world of software engineering keeps growing rapidly, and the community of JavaScript is not an exception. With the power of one of the most successful package manager, npm, we can build our own applications and libraries from powerful modules in the wild. It provides us unlimited flexibility and customizability while the process to integrate those modules is extremely easy.

However, it gives a challenge that you have to choose the platform your product running on from almost infinite amount of combinations, which is quite tough and can easily overwhelm us.

**enmove** is super lazy helper to scaffold projects and gives you almost *no choices* of what you can use as platform. How embarassing is that.

enmove forces you to use following platforms to make your products:

- **TypeScript**
- react
- jest (for testing)
- dtslint (for type testing)
- enzyme (for react testing)
- tslint (for linting)
- webpack (for bundling and web applications)
- electron (for desktop app)
- sass (for writing css)

Do you want to use something else in place of any items in the list? It means, perhaps, that you will require considerable amount of efforts to smoothly adopt this module to your project. If so, you may want to completely ignore this project, or fork this repo and customize it to suits your own needs and hopefully share it with us.

## Packages

TODO: Write doc

- Add one of `pack-*` packages to your project as dev dependency
- `conf-*` and `run-*` are used to import the preset configs in your actual config files
- `with-*` depend on its corresponding `conf-*` package and required dependencies to build an app or a library on the specific platform

```
pack-* -> with-* -> conf-* or run-*
```
