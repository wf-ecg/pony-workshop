/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(function () {
    function Pair(a, b) {
        this.a = a || 0;
        this.b = b || a || 0;
    }
    Pair.prototype = {constructor: Pair,
        check: function (a, b) {
            if (a.constructor !== Pair) {
                a = new Pair(a || 0, b || a || 0);
            }
            return a;
        },
        moveBy: function (a, b) {
            a = this.check(a, b);
            this.a += a.a;
            this.b += a.b;
            return this;
        },
        diffWith: function (a, b) {
            a = this.check(a, b);
            return new Pair(a.a - this.a, a.b - this.b);
        },
        toString: function () {
            return JSON.stringify(this);
        },
    };
    return Pair;
});
/*



 */
