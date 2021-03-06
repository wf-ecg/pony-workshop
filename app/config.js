/*jslint white:false */
/*global require, window, _ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
    C = (W.C || W.console || {});

W.SHIET = {};
W.debug = (new Date('2016/01/01') > new Date()) ? 1 : 0;

require.config({
  baseUrl: 'scripts',
  paths: {
    lr: 'http://localhost:7002/livereload.js?snipver=1',
    jquery: '/mfal/lib/jquery/1.11.3/jquery.min',
    jqmobi: '/mfal/lib/jquery/mobile/custom/jquery.mobile',
    lodash: '/mfal/lib/underscore/js-1.4.4/lodash.underscore',
    modern: '/mfal/lib/modernizr/2.6.2/modernizr.min',
    slick: '/mfal/lib/slick/1.5.7/slick.min',
    //
    box: 'libs/box',
    beacon: 'libs/ecg-beacon',
    console: 'libs/console',
    jqxtn: 'libs/jq-xtn',
    mailer: 'libs/mailer',
    pair: 'libs/pair',
    stats: 'libs/ecg-stats',
  }
});

require(['console', 'lodash'], function () {
  var statToken;

  try {
    W.SHIET.init();

    if (W.SHIET.trident) { // debug IE less
      W.debug--;
    } else if (W.location.hostname === '10.89.101.100') {
      W.debug += 1;
    } else if (W.W.location.hostname === 'localhost') {
      W.debug += 2;
      $('html').addClass('debug');
    }
  } catch (err) {
    C.error('config', err);
  }
  _.delay(function () {
    if (W.debug < 0) {
      require(['stats'], function (stats) {
        stats.init(statToken);
      });
    } else {
      require(['lr'], function () {
        C.warn('LiveReloading @ ' + W.debug);
      }, function () {
        W.debug--;
        C.info('no LiveReloading @ ' + W.debug);
      });
    }
  }, 1e3);

  /// CUSTOM
  statToken = statToken || 'PONY-Work';
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
