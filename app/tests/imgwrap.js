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

    var Nom = 'ImgWrap';
    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        U, _self, self;

    function db(num) {
        return W.debug > (num || 0);
    }
    function dataChunk(cano, x1, y1, x2, y2) {
        return cano.getImageData(x1, y1, x2, y2);
    }
    function draw(cano, ele, x, y) {
        return cano.drawImage(ele, x || 0, y || 0);
    }
    function stamp(cano, dat, x, y) {
        return cano.putImageData(dat, x || 0, y || 0);
    }

    _self = {
        _a: 1, //  alpha
        _id: U, // image data cache
        _rd: U, // raw data cache
        _ie: U, // image-element
        _ce: U, // canvas element
        _co: U, // canvas object
        _setImage: function (ele) {
            this._ie = ele;
        },
        _setCanvas: function (ele) {
            this._ce = ele;
            this._co = ele.getContext('2d');
        },
        _sampleImage: function () {
            if (!this._id) {
                this._id = dataChunk(this._co, 0, 0, this._ce.width, this._ce.height);
                this._rd = this._id.data;
            }
            return this._id;
        },
        getSelf: function () {
            return this._ie;
        },
        makeGray: function () {
            var d = this._sampleImage().data, i, n;

            for (i = 0, n = d.length; i < n; i += 4) { // each pixel group
                this._pixGray(i);
            }
        },
        modAlpha: function (a) { // a is alpha
            var d = this._sampleImage().data, i, n;

            for (i = 0, n = d.length; i < n; i += 4) { // each pixel group
                this._pixAlpha(i, a);
            }
        },
        _pixAlpha: function (i, a) { // i is offset
            a = a || this._a || 1;
            i = i || 0;
            this._rd[i + 3] *= a; // modify current alpha
        },
        _pixGray: function (i) { // i is offset
            var d = this._rd, g;
            i = i || 0;

            g = (d[i + 0] / 3) + (d[i + 1]) + (d[i + 2] / 9); // mix chans
            d[i + 0] = d[i + 1] = d[i + 2] = g; // all go gray
        },
        rowLength: function () {
            return (this._sampleImage().width * 4);
        },
        rowIdx: function (n) {
            return (n * this.rowLength());
        },
        pixIdx: function (x, y) {
            return (x * 4) + (this.rowIdx(y));
        },
        dump: function () {
            this.dumpAt(0, 0);
            this._co.fillStyle = "blue";
            this._co.fillRect(10, 10, 100, 100);

            this._co.fillStyle = "red";
            this._co.fillRect(50, 50, 100, 100);
        },
        dumpAt: function (x, y) {
            return draw(this._co, this._ie, x, y);
        },
        stamp: function (x, y) {
            return stamp(this._co, this._id, x, y);
        },
    };

    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function ImgWrap(imgEle, canEle) {
        if (!imgEle || !canEle) {
            throw new Error('bad args');
        }
        this._setImage(imgEle);
        this._setCanvas(canEle);

        if (db()) {
            C.info('test', Nom, this);
        }
    };
    self = ImgWrap;
    self.prototype = _self;
    self.constructor = self;

    return self;
});
/*



 */
