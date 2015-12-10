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

    var ImageData = {
        data: [],
        height: 0,
        width: 0,
    };

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    var _Img = {
        _a: 1, //  alpha
        _d: [], // raw-data
        _i: 0, //  index
        _o: {}, // image-data
        setData: function (dat) {
            this._d = dat || ImageData;
        },
        getData: function () {
            return this._d || ImageData;
        },
        getSelf: function () {
            return this._o || ImageData;
        },
        makeGray: function () {
            var d = this.getData(), i, n;

            for (i = 0, n = d.length; i < n; i += 4) { // each pixel group
                this.pixGray(i);
            }
        },
        modAlpha: function (a) { // a is alpha
            var d = this.getData(), i, n;

            for (i = 0, n = d.length; i < n; i += 4) { // each pixel group
                this.pixAlpha(i, a);
            }
        },
        pixAlpha: function (i, a) { // i is offset
            var d = this.getData();
            a = a || this._a || 1;
            i = i || this._i || 0;

            d[i + 3] *= a; // modify current alpha
        },
        pixGray: function (i) { // i is offset
            var d = this.getData(), g;
            i = i || this._i || 0;

            g = (d[i + 0] / 3) + (d[i + 1]) + (d[i + 2] / 9); // mix chans
            d[i + 0] = d[i + 1] = d[i + 2] = g; // all go gray
        },
        rowLength: function () {
            return (this.getSelf().width * 4);
        },
        rowIdx: function (n) {
            return (n * this.rowLength());
        },
        pixIdx: function (x, y) {
            return (x * 4) + (this.rowIdx(y));
        },
    };
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Img(obj) {
        if (!obj) {
            throw new Error('bad arg');
        }
        this._o = obj;
    }

    Img.prototype = _Img;
    Img.constructor = Img;

    return Img;
});
/*



 */
