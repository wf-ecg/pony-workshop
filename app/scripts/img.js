/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE
 control

 TODO
 document a bit
 */

define(['jquery', 'lodash'], function
    KLASS($) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Img';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }
    var _Img = {
        _a: 1, //  alpha
        _d: {}, //  data
        _i: 0, //   index
        setData: function (dat) {
            this._d = dat;
        },
        getData: function () {
            return this._d;
        },
        makeGray: function () {
            var d = this.getData(), i, n;

            for (i = 0, n = d.length; i < n; i += 4) {
                this.picGray(i);
            }
        },
        modAlpha: function (a) { // a is alpha
            var d = this.getData(), i, n;

            for (i = 0, n = d.length; i < n; i += 4) {
                this.picAlpha(i, a);
            }
        },
        picAlpha: function (i, a) { // i is offset
            var d = this.getData();
            a = a || this._a || 1;
            i = i || this._i || 0;

            d[i + 3] *= a;
        },
        picGray: function (i) { // i is offset
            var d = this.getData(), g;
            i = i || this._i || 0;

            g = (d[i + 0] / 3) + (d[i + 1]) + (d[i + 2] / 9);
            d[i + 0] = g;
            d[i + 1] = g;
            d[i + 2] = g;
        },
    };
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Img() {}

    Img.prototype = _Img;
    Img.constructor = Img;

    return Img;
});
/*



 */
