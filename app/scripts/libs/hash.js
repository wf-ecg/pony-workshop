/*jslint  white:false */
/*global define, window, JSON */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2014

 USE
 manage response/updates to reading/writing of location hash

 TODO
 document a bit
 modernize api
 loosely load
 */

define(['jquery', 'lodash'], function
    KLASS($, _) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Hash';
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

    function Hash(sel) {
        var api, ele;

        sel = sel || 'body';
        ele = $(sel).first();
        api = ele.data(Nom);

        function readHash() {
            return $.deparam(W.location.hash.slice(1));
        }

        function compare(x, y) {
            x = JSON.stringify(x);
            y = JSON.stringify(y);
            return x === y;
        }

        function _breakHash() {
            var obj = readHash();
            var pre = api.obj;

            if (db(2)) {
                C.info(Nom + '_breakHash', pre, obj);
            }
            api.obj = obj;

            if (!compare(pre, obj)) {
                $.publish(ns('change'), obj);
            }

            return obj;
        }

//      EXTEND

        if (!api) { // create instance
            api = $.extend({api: Nom + ':' + sel}, {
                _: {
                    ele: ele,
                },
                obj: {},
                get: _breakHash,
                check: function () {
                    _.delay(_breakHash, 99);
                    return api;
                },
            });

            // store api as data
            ele.data(Nom, api);
        }

//      INIT

        if (db(1)) {
            C.log(Nom + '[[init]]', api);
        }
        return api;
    }

    return Hash;
});
/*



 */
