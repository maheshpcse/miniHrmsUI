# MiniHrmsUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Use Node.js **12.22.12** for this legacy Angular 10.1 project (also recorded in `.nvmrc`). Angular 10.1 supports Node 10/12; its old development-server dependencies fail on Node 24 with `No such module: http_parser`. See the [Angular compatibility table](https://angular.dev/reference/versions).

With dependencies installed, start the app using your existing system Node/npm:

```powershell
npm.cmd start
```

The start script uses `npx` to download and cache Node 12.22.12 and run the local Angular CLI with it. The first run requires internet access. No nvm installation or system Node change is needed. This runtime selection applies to `npm start`; other Angular commands still need a compatible runtime.

The equivalent direct command is:

```powershell
npx.cmd --yes --package=node@12.22.12 -- node node_modules/@angular/cli/bin/ng serve --port 7200
```

Navigate to `http://localhost:7200/`. The app will automatically reload if you change any of the source files. The `.cmd` suffix avoids PowerShell execution-policy errors for npm/npx scripts.

This runtime is a legacy compatibility workaround. Upgrade Angular and its build tooling before moving this project to a currently supported Node version.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Redesigned workspace

See [the implementation and validation report](docs/workspace-redesign.md) for page coverage, database changes, screenshots and deployment configuration. Use `npm.cmd run build -- --prod` for a production build. Production hosting must forward `/api` to the backend.

## GitHub Pages deployment

See [the GitHub Pages and Railway setup guide](docs/DEPLOYMENT.md). The Pages build uses the public Railway API URL and hash routing; it does not use the local development proxy.

