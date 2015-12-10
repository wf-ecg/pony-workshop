/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 recreated drt 2015-09

 USE
 control simple left to right carousel

 TODO
 loosely load
 */

define(['jquery', 'lodash', 'libs/gauge'], function
    KLASS($, _, Gauge) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Slider';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});
    var Df = {
        delay: 999,
        leftArrow: '<div class="w-slider-arrow-left">',
        leftIcon: '<div class="w-icon-slider-left">',
        mask: '.w-slider-mask',
        rightArrow: '<div class="w-slider-arrow-right">',
        rightIcon: '<div class="w-icon-slider-right">',
        trans: 'transform 0.5s',
    };

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    var K = {
        max: _.debounce(function () {
            $.publish(ns('max'));
        }, Df.delay, true),
        mid: _.debounce(function () {
            $.publish(ns('mid'));
        }, Df.delay, true),
        min: _.debounce(function () {
            $.publish(ns('min'));
        }, Df.delay, true),
        limit: function (num, top, bot) {
            num = num | 0;
            top = top | 0;
            bot = bot | 0;

            if (num > top) {
                num = K.max() || top;
            } else if (num < bot) {
                num = K.min() || bot;
            } else {
                K.mid();
            }
            return num;
        },
    };
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Slider(sel, cf) {
        sel = sel || '.c-slider';
        cf = $.extend({}, Df, cf);

        var api, ele;

        ele = $(sel);
        api = ele.data(Nom);
        ele = {
            main: ele,
            mask: ele.find(cf.mask).css({
                overflow: 'visible',
                transition: cf.trans,
                '-webkit-transition': '-webkit-' + cf.trans,
            }),
        };

        function _bind() {
            _addControls();
            $.subscribe('resize.Main', refreshSizes);
            ele.mask.outerWidth(api.wrapWidth);
            refreshSizes(); // kick off

            if (db(1)) {
                api[Nom + ':' + sel] = {
                    _closure: KLASS,
                    cf: cf,
                    ele: ele,
                };
                C.log(Nom + '<binding>', api);
            }
        }
        function _addControls() { // add arrows and such
            ele.main.append(
                $(cf.leftArrow).append(cf.leftIcon),
                $(cf.rightArrow).append(cf.rightIcon)
                );
        }
        function _closestNotch() { // get nearest notch
            var i = 0;

            for (; i < api.notches.length; i++) {
                if (api.lastposi <= api.notches[i]) {
                    return i;
                }
            }
        }
        function _setPosition(pix) { // slide to...
            pix = parseInt(pix, 10) || 0;

            api.lastposi = pix = K.limit(pix, api.travel);
            ele.mask.stop(0, 1);

            if (!W.SHIET.ltie9) {
                ele.mask.css({
                    transform: 'translate(' + -pix + 'px' + ')',
                    '-webkit-transform': 'translate(' + -pix + 'px' + ')',
                });
            } else {
                ele.mask.animate({
                    left: (-pix + 'px'),
                });
            }
        }

//      PUBLIC

        function asPix(dec) { // turn fraction into amount of travel
            return api.travel * dec;
        }
        function refreshSizes() {
            api.width = ele.main.outerWidth() || 1;
            api.notches = api.widths.index();
            api.wrapWidth = api.notches.total || 1;
            api.travel = (api.wrapWidth - api.width) || 1;

            _setPosition(asPix(api.lastposi)); // page last percentage
        }

//      INIT

        if (!api) {
            api = $.extend(this, {
                lastposi: 0,
                notches: null,
                travel: null,
                width: null,
                widths: new Gauge(ele.mask, {
                    prop: 'outerWidth',
                }),
                wrapWidth: null,
                refresh: refreshSizes,
                find: function (sel) {
                    return ele.main.find(sel);
                },
                page: function (i) {
                    var p = api.notches[parseInt(i, 10)];
                    p = p >= 0 ? p : _closestNotch();
                    _setPosition(p);
                    return api;
                },
                move: function (pix) {
                    _setPosition(api.lastposi + pix);
                    return api;
                },
                next: function () {
                    var i = _closestNotch() + 1;
                    _setPosition(api.notches[i]);
                    return api;
                },
                prev: function () {
                    var i = _closestNotch() - 1;
                    _setPosition(api.notches[i]);
                    return api;
                },
                percent: function (pct) {
                    _setPosition(asPix(pct / 100));
                    return api;
                },
            });
            ele.main.data(Nom, api); // store api as data
        }
        _bind(); // instance
        return api;
    }

    return Slider;
});
/*



 */
