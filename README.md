<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

A [Nest](https://github.com/nestjs/nest) boilerplate with Typescript, Postgresql, TypoORM, Swagger, and best application architecture. 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# init database
$ npm run init

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Code Style

The classic [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) combo is used as Nest originally recommended. The configuration could be found at `.eslintrc.js` for both ESLint and Prettier as single source of truth. 

```bash
# manually lint the code base     
$ npm run lint

# while you can also do lint through IDE 
```

## Git Hooks

The classic [lint-staged](https://github.com/okonet/lint-staged) with [husky](https://github.com/typicode/husky) is used for Git Hooks. It is configured as:

- pre-commit: check typescript and lint all ts files
- pre-push: run testing

where detailed configuration can be found at `package.json`.

## Swagger

Already integrated API documentation. To see all available endpoints visit http://localhost:3000/api-docs
