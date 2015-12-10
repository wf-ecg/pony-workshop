/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2014

 USE
 increase/decrease along a range with simulated momentum

 TODO
 document a bit
 modernize api
 loosely load
 */

define([], function
    KLASS() {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Speed';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Speed(mag) {
        var api, speed = 1;

        mag = (mag || 1) + 10;

        api = {
            cf: Nom,
            timo: null,
            drag: mag / 10,
            roof: mag * 10,
            value: mag,
            coasting: function () {
                W.clearTimeout(api.timo);
                api.timo = W.setTimeout(api.coast, api.roof);
            },
            coast: function () {
                if (speed > api.drag) {
                    api.value = speed /= api.drag;
                }
                api.coasting();
            },
            climb: function () {
                api.coasting();
                if (speed < api.roof) {
                    api.value = speed *= api.drag;
                }
                return speed;
            },
            setMag: function (num) {
                mag = num;
            },
            setDrag: function (num) {
                api.drag = num;
            },
            toString: function () {
                return speed;
            },
        };

//      INIT

        if (db()) {
            C.log(Nom + '[[init]]', api);
        }
        return api;
    }

    return Speed;
});
/*



 */
