/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE
    help manage two dimentional pairs

 TODO
    expand upon methods
    .area
    .overlap
    .collision
    :proxyPoint? (set an anchor relative to top-left)

 */
define(['pair'], function (Pair) {
    'use strict';
    // instance constructor
    function Box(w, h) {
        this.lt = new Pair(0, 0);
        this.rb = new Pair(w || 1, h || 1);
    }
    Box.prototype = {constructor: Box,
        getLeft: function () {
            return this.lt.a;
        },
        getTop: function () {
            return this.lt.b;
        },
        getRight: function () {
            return this.rb.a;
        },
        getBottom: function () {
            return this.rb.b;
        },
        getWidth: function () {
            return Math.abs(this.rb.a - this.lt.a);
        },
        getHeight: function () {
            return Math.abs(this.rb.b - this.lt.b);
        },
        // (toArray)
        getRect: function () {
            return [this.getLeft(), this.getTop(), this.getRight(), this.getBottom()];
        },
        // adjust edges using default proxy point
        moveBy: function (n1, n2) {
            this.lt.moveBy(n1, n2);
            this.rb.moveBy(n1, n2);
            return this.getRect();
        },
        // specify edges using default proxy point
        moveTo: function (n1, n2) {
            this.rb.moveBy(this.lt.diffWith(n1, n2));
            this.lt = new Pair(n1, n2);
            return this.getRect();
        },
        toString: function () {
            return JSON.stringify(this.getRect());
        },
    };
    return Box;
});
/*



 */
