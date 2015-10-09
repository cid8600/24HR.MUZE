/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'scss',
      includePaths: ['styles']
    },
    outputPaths: {
      app: {
        css: {
          'app': '/assets/tf.css'
        }
      }
    }
    // Add options here
  });

  app.import('bower_components/ember/ember-template-compiler.js');
  app.import('bower_components/moment/min/moment-with-locales.min.js');
  app.import('vendor/jquery.backstretch.min.js');
  app.import('vendor/jquery.debounce.js');
  app.import('vendor/parallax.js');
  app.import('vendor/handleajax.js');
  app.import('vendor/geo.js');
  app.import('vendor/ebapi.js');

// var broccoli_sass = require('broccoli-sass');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
