/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2014

 USE
 determine px/pct for element sizing calculation

 TODO
 document a bit
 modernize api
 loosely load
 */

define(['jquery'], function
    KLASS($) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Ratio';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Ratio(limit, sel) {
        var api;

        function _check() {
            // limit ratio
            api.ele.width(api._mod());
        }

        if (!api) { // create instance
            api = $.extend({api: Nom + ':' + sel}, {
                bod: $('body'),
                ele: $(sel || 'body'),
                limit: limit || 1.5,
                mod: null,
                rat: null,
                _rat: function () {
                    var x = api.bod.width(), y = api.bod.height();

                    x = x / y;
                    api.rat = x = Math.round(x * 1000) / 1000;

                    return api.rat;
                },
                _mod: function () {
                    var x = (api._rat() - api.limit);

                    x = (x > 0 ? (1 - (x / 4)) : 1);
                    api.mod = x * 100 + '%';

                    return api.mod;
                },
            });
        }

//      INIT

        if (db()) {
            C.log(Nom + '[[init]]', api);
        }
        return _check;
    }

    return Ratio;
});
/*



 */
