/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE
 help manage size/coordinate pairs

 TODO
 expand upon methods
 .angle
 .distance
 .intersect

 */
define(function () {
  'use strict';
  // instance constructor
  function Pair(a, b) {
    this.a = a || 0;
    this.b = b || a || 0;
  }
  Pair.prototype = {constructor: Pair,
    // ensure a proper pair of values
    check: function (a, b) {
      if (a.constructor !== Pair) {
        a = new Pair(a || 0, b || a || 0);
      }
      return a;
    },
    // adjust pair by relative values
    moveBy: function (a, b) {
      a = this.check(a, b);
      this.a += a.a;
      this.b += a.b;
      return this;
    },
    // obtain relative values to another pair
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
