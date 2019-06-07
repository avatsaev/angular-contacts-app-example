<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.imgur.com/R2NlsFd.png" /></a>
</p>


# Full Stack Angular PWA app with NgRx Store, Effects (HTTP+WebSockets), Entity & NestJS

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)




**Backend is available here: https://github.com/avatsaev/angular-contacts-app-example-api**


**DEMO: https://angular-contacts-ngrx.surge.sh**

This application uses [@ngrx/store](https://github.com/ngrx/platform/blob/master/docs/store/README.md) to manage application state, and [@ngrx/effects](https://github.com/ngrx/platform/blob/master/docs/effects/README.md) to manange side effects (http+sockets), It also uses NgRx fractal state management to leverage lazy loading of reducers and effects.

[@ngrx/entity](https://github.com/ngrx/platform/tree/master/docs/entity) is released and available on NPM, @ngrx/entity helps to reduce boilerplate and [manipulate data](https://i.imgur.com/2IGdFRB.jpg) in a fast and easy fashion, you can find @ngrx/entity implementation in Contacts Reducer.


# NGRX infrastructure


## Ngrx + Effects with an HTTP Service

![](https://i.imgur.com/qtjdPbe.png)


## Ngrx + Effects with Socket.IO

![](https://i.imgur.com/jIQ4Rd3.png)


## Lighthouse Audit:

![](https://i.imgur.com/UqW3s9M.png)


## Get started 

You can run the app with docker compose:

```
$ docker-compose up --build
```

The app will be available at: http://localhost:4000

![](http://i.imgur.com/TKWwYgQ.png)

![](http://i.imgur.com/GBBXbuu.png)

![](http://i.imgur.com/J4inaXx.png)

## Development server

Start the backend server: https://github.com/avatsaev/angular-contacts-app-example-api

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
