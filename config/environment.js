/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'tf',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    // config/environment.js
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' liveReloadPort https://cdnjs.cloudflare.com/ https://ajax.googleapis.com/ https://cdnjs.cloudflare.com/", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' http://fonts.gstatic.com http://maxcdn.bootstrapcdn.com/ https://cdnjs.cloudflare.com/", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' liveReloadPort https://api.github.com/ https://www.eventbriteapi.com/", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "'self' https://img.evbuc.com/ https://raw.githubusercontent.com/ https://www.dropbox.com/ http://www.chrisdonham.com/ https://cdnjs.cloudflare.com/ http://i.imgur.com/ data:",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com http://maxcdn.bootstrapcdn.com/ https://cdnjs.cloudflare.com/", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "'self' data: https://cdnjs.cloudflare.com/"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
