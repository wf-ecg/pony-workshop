/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['jquery', 'tests/box'], function ($) {
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

    function Binder(uid) {
        var $$ = {}; // cache
        var id = uid + ':change';

        this.binder_idx = count++;
        this.ps = $({}); // queue
        this.set = function (key, val) {
            self.pub(id, [key, val, self]);
        };
        this.get = function (key) {
            return $$[key];
        };

        // select elements with `data-bind-<uid>=<key>`
        var attr = 'bind-' + uid,
            self = this;

        // publish from elements with data-bind proxy to objects
        $(D).on('change', '[data-' + attr + ']', function (e) {
            var ele = $(this);

            self.pub(id, [ele.data(attr), ele.val()]);
        });

        // subscribe to object and element changes
        self.sub(id, function (e, key, val, from) {
            $$[key] = val;
            if (from !== self) {
                return;
            }
            // propagate to key bound elements
            $('[data-' + attr + '=' + key + ']').each(function () {
                var ele = $(this);

                if (ele.is('input, textarea, select')) {
                    ele.val(val);
                } else {
                    ele.html(val);
                }
            });
        });
    }
    Binder.prototype = {constructor: Binder,
        toString: function () {
            return JSON.stringify(this);
        },
        sub: function () {
            this.ps.on.apply(this.ps, arguments);
        },
        pub: function () {
            this.ps.trigger.apply(this.ps, arguments);
        },
    };

    return Binder;
});
/*



 */
