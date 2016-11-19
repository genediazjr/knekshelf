# knekshelf
[![Build Status](https://travis-ci.org/genediazjr/knekshelf.svg?branch=master)](https://travis-ci.org/genediazjr/knekshelf)
[![Coverage Status](https://coveralls.io/repos/github/genediazjr/knekshelf/badge.svg)](https://coveralls.io/github/genediazjr/knekshelf)
[![Code Climate](https://codeclimate.com/github/genediazjr/knekshelf/badges/gpa.svg)](https://codeclimate.com/github/genediazjr/knekshelf)
[![NPM Version](https://badge.fury.io/js/knekshelf.svg)](https://www.npmjs.com/knekshelf)
[![NPM Downloads](https://img.shields.io/npm/dt/knekshelf.svg?maxAge=2592000)](https://www.npmjs.com/knekshelf)<br>
[![Dependency Status](https://david-dm.org/genediazjr/knekshelf.svg)](https://david-dm.org/genediazjr/knekshelf)
[![Known Vulnerabilities](https://snyk.io/test/github/genediazjr/knekshelf/badge.svg)](https://snyk.io/test/github/genediazjr/knekshelf)
[![NSP Status](https://nodesecurity.io/orgs/genediazjr/projects/2f3cd15e-6779-4c4a-9016-9e1afb457284/badge)](https://nodesecurity.io/orgs/genediazjr/projects/2f3cd15e-6779-4c4a-9016-9e1afb457284)

Expose raw knex and bookshelf on Hapi.

## Usage

```js
const Knekshelf = require('knekshelf');
const server = new Hapi.Server();

server.register({
    register: Knekshelf,
    options: {
        knex: {
            client: 'pg',
            searchPath: 'public',
            connection: 'postgres://postgres:postgres@localhost:5432/postgres'
        }
    }
});

// available through server.plugins
server.plugins.knekshelf.bookshelf
server.plugins.knekshelf.knex

// available through plugin
Knekshelf.ext.bookshelf
Knekshelf.ext.ext
```

`pg` was used for testing.

## Contributing
* Include 100% test coverage.
* Follow the [Hapi coding conventions](http://hapijs.com/styleguide)
* Submit an issue first for significant changes.
