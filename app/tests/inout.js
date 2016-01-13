/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO


 bind any value
 create input field
 watcher gets and sets

 */
define(['pair', 'box'], function (Pair, Box) {
    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        U;

    function Inout() {
    }
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    Inout.prototype = {constructor: Inout,
        toString: function () {
            return JSON.stringify(this);
        },
    };

    return Inout;
});
/*



 */
