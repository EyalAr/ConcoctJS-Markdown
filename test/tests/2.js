var assert = require('assert');

describe("ConcoctJS - Markdown plugin options test", function() {

    var Concoction = require('concoct'),
        options = {
            templates: './test/templates/1.tpl',
            contexts: './test/contexts/1.json',
            dest: './test/output',
            linkingRules: {
                './test/contexts/1.json': './test/templates/1.tpl'
            },
            plugins: [{
                name: 'concoct-content-loader',
                handler: require('concoct-content-loader'),
                params: {
                    srcField: 'file',
                    contentField: 'content'
                }
            }, {
                name: 'concoct-markdown',
                handler: require('../../'),
                params: {
                    fields: 'contenxxxxt', // non existing field
                    highlight: true
                }
            }, {
                name: 'concoct-mustache',
                handler: require('concoct-mustache')
            }, {
                name: 'concoct-named-buffers',
                handler: require('concoct-named-buffers'),
                params: {
                    destField: 'slug',
                    postfix: '.html'
                }
            }]
        },
        c;

    before(function(done) {

        // erase everything is the dest directory

        var rimraf = require('rimraf'),
            fs = require('fs');

        rimraf(options.dest, function(err) {

            if (err) return done(err);

            fs.mkdir(options.dest, done);

        });

    });

    it('should not have an error', function(done) {

        c = new Concoction(options);
        c.concoct(function(err) {

            assert(!err);
            done();

        });

    });

});