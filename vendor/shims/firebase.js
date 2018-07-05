(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['firebase'],
      __esModule: true,
    };
  }

  define('firebase', [], vendorModule);
})();
