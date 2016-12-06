/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*!
 * Console: MSIE Workarounds v1.5.6
 * Build: `node /usr/local/bin/r.js -o build.js`
 * Copyright: 2015-06-01 @ WF via drt
 * http //ecgsolutions.hosting.wellsfargo.com/wordpress/?cat=6
 */
var W = (W && W.window || window),
    C = (W.C || W.console || {});

define(['jquery'], function ($) {
  'use strict';

  W.SHIET = {
    trident: Boolean(W.navigator.userAgent.indexOf('rident') + 1),
    init: function () {
      if (!$.fn)
        throw new Error('init requires jquery');
      if (this.trident)
        $('html').addClass('msie');
      return this;
    }
  };

  (function (c) {
    W.C = W.console = c;

    if (W.window !== window || !C.debug) {
      throw new Error('probably old IE');
    }
  }(function () {
    try {
      return C || C.log();
    } catch (e) {
      W.alert('Minimum requirement: IE8 or greater.\n' + e);
    }
  }()));
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
