Before working on the project in this repo I was concerned with using typescript,
but the react-window / virtualized library was not mature enough for ts and react 18.
I put a repo using typescript at the end of this readme, only experimental not fully work.

## Staging
https://delman.vercel.app/

### Getting Started

First, run the development server:

```bash
yarn dev
```

### Framework & Libraries

Next.js<br/>
Chakra UI<br/>
Jotai (state management)<br/>
axios<br/>
react-query<br/>
react-window<br/>
Cypress.js

### Run test (cypress)

```bash
yarn cypress:open
```

Run test fot staging server:
Modify cypress.config.js

```bash
baseUrl: 'https://delman.vercel.app'
```

This projct is not implement TDD, so test coverage is so minimal. Just to show how to test with cypress

## !!!Experimental repo using typescript _(not fully work)_
https://github.com/allfix53/virtualized-table
