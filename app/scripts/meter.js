/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 attach to meter elements and update

 TODO
 loosely load
 */

define(['jquery'], function
    KLASS($) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Meter';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});
    var Df = {
        path: 'images/meter/reveal',
        sel: 'body',
    };

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Meter(sel, cf) {
        cf = $.extend({}, Df, cf);
        sel = sel || cf.sel;

        var api, ele;

        ele = $(sel).first();
        ele = {
            main: ele,
            mask: ele.find('.m-mask img'),
        };
        api = ele.main.data(Nom);

        function _bind() {

            if (db(1)) {
                api[Nom + ':' + sel] = {
                    _closure: KLASS,
                    cf: cf,
                    ele: ele,
                };
                C.log(Nom + '<binding>', api);
            }
        }
        function _checkNum(num) {
            if (typeof num !== 'number' || num < 0 || num > 100) {
                throw new Error('not a valid percent');
            }
            return 10 * Math.round(num / 10); // round to 10ths
        }

//      PUBLIC

        function setPercent(num) {
            ele.mask.hide();
            num = _checkNum(num);
            if (num < 100) {
                ele.mask // update mask path with a percent number
                    .attr('src', cf.path + '-' + num + '.png') //
                    .show();
            }
        }
        function bindEvent(evt, cb) {
            ele.main.on(ns(evt), cb);
        }

//      INIT

        if (!api) {
            api = $.extend(this, {
                set: setPercent,
                bind: bindEvent,
            });
            // store api as data
            ele.main.data(Nom, api);
        }
        _bind(); // instance
        return api;
    }

    return Meter;
});
/*




 */
