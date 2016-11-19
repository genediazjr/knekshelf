'use strict';

const internals = {};


exports.register = (server, options, next) => {

    try {
        internals.bookshelf = require('bookshelf')(require('knex')(options.knex));
        internals.knex = internals.bookshelf.knex;

        server.expose('bookshelf', internals.bookshelf);
        server.expose('knex', internals.knex);
    }
    catch (err) {

        return next(err);
    }

    return next();
};


exports.ext = internals;


exports.register.attributes = {
    pkg: require('../package.json')
};
