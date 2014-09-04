/*
 * hapi-mongoose-plugin
 * https://github.com/kwakayama/hapi-mongoose-plugin
 *
 * Copyright (c) 2014 Kentaro Wakayama
 * Licensed under the MIT license.
 */

'use strict';

var Hapi = require('hapi');
var Plugin = require('../');

var server = new Hapi.Server('localhost', 8000);

server.pack.register(Plugin, function() {
    server.start();
    console.log('Server running at ' + server.info.uri);
});
