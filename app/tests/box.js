/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['tests/pair'], function (Pair) {
    function Box(w, h) {
        this.tl = new Pair(0, 0);
        this.br = new Pair(w || 1, h || 1);
    }
    Box.prototype = {constructor: Box,
        getLeft: function () {
            return this.tl.a;
        }, getTop: function () {
            return this.tl.b;
        },
        getRight: function () {
            return this.br.a;
        }, getBottom: function () {
            return this.br.b;
        },
        getRect: function () {
            return [this.getLeft(), this.getTop(), this.getRight(), this.getBottom()];
        },
        moveBy: function (x, y) {
            this.tl.moveBy(x, y);
            this.br.moveBy(x, y);
            return this.getRect();
        },
        moveTo: function (x, y) {
            this.br.moveBy(this.tl.diffWith(x, y));
            this.tl = new Pair(x, y);
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
