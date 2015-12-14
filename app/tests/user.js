/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['jquery', 'tests/binder'], function
    ($, Binder) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        U, count = 0;

    function db(num) {
        return W.debug > (num || 0);
    }
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function User(uid) {
        var self = this,
            binder = new Binder(uid);

        // proxy get/set changes to Binder
        self.set = function (attr, val) {
            binder.set(attr, val);
            return this;
        };
        self.get = function (attr) {
            return binder.get(attr);
        };
        self.user_idx = count++;
        self.binder = binder;
    }
    User.prototype = {constructor: User,
        toString: function () {
            return JSON.stringify(this);
        },
    };

    return User;
});
/*



 */
