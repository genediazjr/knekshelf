'use strict';

const internals = {};


exports.register = (server, options, next) => {

    if (!Array.isArray(options)) {
        options = [options];
    }

    try {
        for (let o = 0; o < options.length; ++o) {
            const opt = options[o];
            const suffix = opt.suffix || '';

            internals[`bookshelf${suffix}`] = require('bookshelf')(require('knex')(opt.knex));
            internals[`knex${suffix}`] = internals[`bookshelf${suffix}`].knex;

            if (opt.plugins) {
                for (let p = 0; p < opt.plugins.length; ++p) {
                    internals[`bookshelf${suffix}`].plugin(opt.plugins[p]);
                }
            }

            server.expose(`bookshelf${suffix}`, internals[`bookshelf${suffix}`]);
            server.expose(`knex${suffix}`, internals[`knex${suffix}`]);
        }
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
