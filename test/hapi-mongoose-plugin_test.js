'use strict';

var assert = require('assert'),
  hapi = require('hapi'),
  plugin = require('../');

describe('hapi-mongoose-plugin', function() {

  var server;

  beforeEach(function () {
    server = new hapi.Server();
  });

  it('loads successfully', function(done) {
    server.pack.register(plugin, function(err) {

      assert.ok(!err);

      done();
    });
  });
});
