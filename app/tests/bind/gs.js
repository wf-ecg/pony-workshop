/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['pair', 'box'], function (Pair, Box) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        U;

    function db(num) {
        return W.debug > (num || 0);
    }
    function echo(val) {
        return val;
    }
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function GS() {}

    GS.prototype = {constructor: GS,
        toString: function () {
            return JSON.stringify(this);
        },
        gs: function (key, gfn, sfn) {
            gfn = gfn || echo;
            sfn = sfn || echo;
            var pre,
                $$ = {}; // caching object

            if (key in $$) {
                throw new Error('cache collision');
            } else if (key in this) {
                C.warn('key collision', key, pre);
                // attempt to save property for accessor
                pre = this[key];
                // cannot remove?
                if (!delete this[key]) {
                    return;
                }
            }
            Object.defineProperty(this, key, {
                get: function () {
                    return gfn($$[key]);
                },
                set: function (val) {
                    sfn($$[key] = val); // set always evals to val
                },
            });
            // transplant any prior property value
            if (pre !== U) {
                this[key] = pre;
            }
        },
    };

    return GS;
});
/*



 */
