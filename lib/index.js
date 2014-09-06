/*
 * hapi-mongoose-plugin
 * https://github.com/kwakayama/hapi-mongoose-plugin
 *
 * Copyright (c) 2014 Kentaro Wakayama
 * Licensed under the MIT license.
 */

'use strict';

var Hoek = require("hoek"),
  mongoose = require('mongoose'),
  internals = {
    defaults: {
      "host": "0.0.0.0",
      "db": "my-db"
    }
  };

exports.register = function(plugin, options, next) {
  var settings = Hoek.applyToDefaults(internals.defaults, options),
    db;

  if (mongoose.connection.readyState === mongoose.Connection.STATES.connected) {
    console.log('mongoose is already connected');
    db = mongoose.connection;
    plugin.expose('db', db);
    plugin.expose('mongoose', mongoose);

    console.log('TODO: Check if the host and database is the same');
    return next();
  }

  mongoose.connect('mongodb://' + settings.host + '/' + settings.db);

  db = mongoose.connection;

  db.on('error', function err(err) {
    plugin.log(['hapi-mongoose', 'error'], 'Error connecting to MongoDB');
    next(err);
  });

  db.once('open', function callback() {
    plugin.expose('db', db);
    plugin.expose('mongoose', mongoose);

    plugin.log(['hapi-mongoose', 'info'], 'MongoDB connection created');

    next();
  });
};

exports.register.attributes = {
  pkg: require('../package.json')
};
