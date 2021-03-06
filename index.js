var _dataModule = require('data-module');
var gutil = require('gulp-util');
var stream = require('through2').obj;

var DataModuleError = gutil.PluginError.bind(null, 'gulp-data-module');


var dataModule = function dataModule (options) { 'use strict';
    if (!options) options = {};
    var parsing = options.parsing || JSON.parse;

    var dataModuleOptions = {};
    if (typeof options.formatting == 'function') {
        dataModuleOptions.formatting = options.formatting;
        }

    return stream(function dataModuleStream (file, encoding, done) {
        var source;

        if (file.isBuffer()) {
            source = parsing(file.contents.toString());

            file.contents = _dataModule
                ( source
                , dataModuleOptions
                ).toBuffer();
            file.path = gutil.replaceExtension(file.path, '.js');
            }

        else if (file.isStream()) return done(new DataModuleError
            ( 'Streams not supported'
            ));

        this.push(file);
        return done();
        });
    };


dataModule.formatting = _dataModule.formatting;


module.exports = dataModule;
