/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const md5 = require('md5');

module.exports = function(defaults) {
  const fingerprintHash = md5(Date.now());
  const config = defaults.project.config(process.env.EMBER_ENV || 'development');

  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: ['app']
    },
    fingerprint: {
      extensions: ['js', 'css', 'map'], // list of extensions to fingerprint
      customHash: fingerprintHash
    },
    'ember-service-worker': {
      // registrationStrategy: 'inline',
      versionStrategy: 'every-build',
      enabled: config.environment === 'production' // change based on Environment dev/prod/staging
    },
    'esw-index': {
      version: fingerprintHash
    },
    'asset-cache': {
      include: [
        'assets/**/*'
      ],
      exclude: [
        // '**/*.map'
      ],
      manual: [
        // look for reference #manual in index.html
        // 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
      ],
      version: fingerprintHash,
      // prepend: 'https://cdn.example.com/',
      // requestMode: 'cors',
      // lenientErrors: false
    },
    'esw-cache-fallback': {
      patterns: [
        // should be updated with the firebase url
        'https://firestore.googleapis.com/google.firestore.v1beta1.Firestore/',
        'https://fonts.googleapis.com/(.+)',
      ],
      version: fingerprintHash
    }
  });

  app.import('node_modules/firebase/firebase.js');
  app.import('vendor/shims/firebase.js');

  // this will load firestore module. If you want to use it in import statement create a vendor shim
  app.import('node_modules/firebase/firebase-firestore.js');

  return app.toTree();
};
