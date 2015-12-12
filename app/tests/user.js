/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['jquery', 'tests/binder'], function ($, Binder) {
    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        U;

    function User(uid) {
        var binder, user;

        binder = new Binder(uid);
        user = {
            attributes: {},
            // The attribute setter publish changes using the Binder PubSub
            set: function (attr, val) {
                this.attributes[attr] = val;
                binder.trigger(uid + ':change', [attr, val, this]);
            },
            get: function (attr) {
                return this.attributes[attr];
            },
            _binder: binder
        };

        // Subscribe to the PubSub
        binder.on(uid + ':change', function (evt, attr, val, initiator) {
            if (initiator !== user) {
                user.set(attr, val);
            }
        });

        return user;
    }
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    User.prototype = {constructor: User,
        toString: function () {
            return JSON.stringify(this);
        },
    };

    return User;
});
/*



 */
