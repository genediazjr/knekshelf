'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Plugin = require('..');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const it = lab.it;

describe('lib', () => {

    let server;

    beforeEach((done) => {

        server = new Hapi.Server();
        server.connection();
        server.initialize();

        return done();
    });

    const register = (options, next) => {

        server.register({
            register: Plugin,
            options: options
        }, (err) => {

            return next(err);
        });
    };

    it('errors if invalid options', (done) => {

        register({
            test: 'value'
        }, (err) => {

            expect(err).to.exist();

            return done();
        });
    });

    it('registers with option', (done) => {

        register({
            knex: {
                client: 'pg',
                searchPath: 'public',
                connection: 'postgres://postgres:postgres@localhost:5432/postgres'
            }
        }, (err) => {

            expect(err).to.not.exist();

            expect(server.plugins.knekshelf.bookshelf).to.exist();
            expect(server.plugins.knekshelf.knex).to.exist();

            expect(Plugin.ext.bookshelf).to.exist();
            expect(Plugin.ext.knex).to.exist();

            const Reload = require('..');

            expect(Reload.ext.bookshelf).to.exist();
            expect(Reload.ext.knex).to.exist();

            return done();
        });
    });

    it('registers option with suffix', (done) => {

        register({
            suffix: 'Test',
            knex: {
                client: 'pg',
                searchPath: 'public',
                connection: 'postgres://postgres:postgres@localhost:5432/postgres'
            }
        }, (err) => {

            expect(err).to.not.exist();

            expect(server.plugins.knekshelf.bookshelfTest).to.exist();
            expect(server.plugins.knekshelf.knexTest).to.exist();

            expect(Plugin.ext.bookshelfTest).to.exist();
            expect(Plugin.ext.knexTest).to.exist();

            const Reload = require('..');

            expect(Reload.ext.bookshelfTest).to.exist();
            expect(Reload.ext.knexTest).to.exist();

            return done();
        });
    });

    it('registers with plugins', (done) => {

        register({
            knex: {
                client: 'pg',
                searchPath: 'public',
                connection: 'postgres://postgres:postgres@localhost:5432/postgres'
            },
            plugins: [
                'registry',
                'pagination'
            ]
        }, (err) => {

            expect(err).to.not.exist();

            expect(server.plugins.knekshelf.bookshelf).to.exist();
            expect(server.plugins.knekshelf.knex).to.exist();

            expect(Plugin.ext.bookshelf).to.exist();
            expect(Plugin.ext.knex).to.exist();

            const Reload = require('..');

            expect(Reload.ext.bookshelf).to.exist();
            expect(Reload.ext.knex).to.exist();

            return done();
        });
    });

    it('registers with array options', (done) => {

        register([
            {
                knex: {
                    client: 'pg',
                    searchPath: 'public',
                    connection: 'postgres://postgres:postgres@localhost:5432/postgres'
                }
            }
        ], (err) => {

            expect(err).to.not.exist();

            expect(server.plugins.knekshelf.bookshelf).to.exist();
            expect(server.plugins.knekshelf.knex).to.exist();

            expect(Plugin.ext.bookshelf).to.exist();
            expect(Plugin.ext.knex).to.exist();

            const Reload = require('..');

            expect(Reload.ext.bookshelf).to.exist();
            expect(Reload.ext.knex).to.exist();

            return done();
        });
    });
});
