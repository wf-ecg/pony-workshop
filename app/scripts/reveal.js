/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2014

 USE
 control expanding/contracting segement of a page

 TODO
 document a bit
 modernize api
 loosely load
 */

define(['jquery', 'lodash'], function
    KLASS($) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Reveal';
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

    function Reveal(sel1, sel2) {
        var div1, div2, api;

        div1 = $(sel1);
        div2 = $(sel2);
        api = div2.data(Nom);

        function _setHeights(obj) {
            obj = obj || api.origin;
            api.lastposi = obj;

            div1.animate({
                height: obj.d1,
            });
            div2.animate({
                height: obj.d2,
            });
        }
        function _setRatios(rat, fact) {
            if (isNaN(rat))
                throw new Error('not a ratio' + rat);
            fact = fact || 1;

            _setHeights({
                d1: api.total * (1 - rat) * fact,
                d2: api.total * (0 + rat) * fact,
            });
        }
        function _setPixels(pix) {
            _setHeights({
                d1: api.total - pix,
                d2: pix
            });
        }
        function asRats(obj) {
            var rats = {
                r1: obj.d1 / api.total,
                r2: obj.d2 / api.total,
            };

            return rats;
        }
        function _getHeights() {
            api.origin = {
                d1: div1.height(),
                d2: div2.height(),
            };
            api.total = (api.origin.d1 + api.origin.d2);
        }
        function _blank() {
            div1.css('height', '');
            div2.css('height', '');
        }
        function _isActive() {
            return Boolean(api.lastposi.d2);
        }
        function _resize() {
            var rats = asRats(api.lastposi);
            try {
                _blank();
                _getHeights();
                _setRatios(rats.r2);
            } catch (err) {
                //
            }
        }
        function _normal() {
            _setHeights(api.origin);
        }

//      EXTEND

        if (!api) { // create instance
            api = $.extend({}, {
                api: Nom + sel2,
                _: {
                    div1: div1,
                    div2: div2,
                },
                find: function (sel) {
                    return div2.find(sel);
                },
                isActive: _isActive,
                lastposi: {},
                pct: function (pct) {
                    if (pct === undefined) {
                        _normal();
                    } else if (pct === '') {
                        _blank();
                    } else {
                        _setRatios(pct / 100, 1.11);
                    }
                },
                pix: function (num) {
                    if (num === undefined) {
                        _normal();
                    } else if (num === '') {
                        _blank();
                    } else {
                        _setPixels(num);
                    }
                },
            });

            $.subscribe('resize.Main', _resize);
            // store as data
            div2.data(Nom, api);
        }

//      INIT
        _getHeights();
        _setHeights();

        if (db(1)) {
            C.log(Nom + '[[init]]', api);
        }
        return api;
    }

    return Reveal;
});
/*



 */
