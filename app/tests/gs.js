/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['tests/pair', 'tests/box'], function (Pair, Box) {
    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        U;

    function GS() {}
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE
    var __ = {};

    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    GS.prototype = {constructor: GS,
        toString: function () {
            return JSON.stringify(this);
        },
        gs: function (key, gfn, sfn) {
            if (key in this) {
                throw new Error('key collision');
            }
            if (key in __) {
                throw new Error('cache collision');
            }
            Object.defineProperty(this, key, {
                get: gfn || function () {
                    return __[key];
                },
                set: sfn || function (a) {
                    __[key] = a;
                    C.log(__);
                },
            });
        },
    };

    return GS;
});
/*



 */
