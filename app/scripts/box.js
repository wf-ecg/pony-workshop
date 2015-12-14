/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['pair'], function (Pair) {
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
        getRect: function () {
            return [this.getLeft(), this.getTop(), this.getRight(), this.getBottom()];
        },
        moveBy: function (n1, n2) {
            this.lt.moveBy(n1, n2);
            this.rb.moveBy(n1, n2);
            return this.getRect();
        },
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
