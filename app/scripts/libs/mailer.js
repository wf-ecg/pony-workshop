/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 prepare obj/json for sending to relay.php

 TODO
 document a bit
 loosely load
 */

define(['jquery'], function
    KLASS($) {
    'use strict'; // semi-static closure

//CLASS
    var Nom = 'Mailer',
        W = (W && W.window || window),
        C = (W.C || W.console || {});

    function Mailer(to, from, sub, msg, cc, pic) {
        var relay = W.Main.relayLoc + 'lib/relay2.php';

        this.to = to;
        this.from = from;
        this.sub = sub || 'Howdy';
        this.msg = msg || 'howdy there pardner...' + new Date();
        this.cc = cc || '';
        this.pic = pic || '';
        this.key = '***';
        this.relay = relay;

        this.setRelay = function (url) {
            relay = url;
        };
        this.getRelay = function () {
            return relay;
        };
        this.encodeObj = function () {
            var key, str = '';

            for (key in this) {
                var val = this[key];

                if (typeof val === 'function') {
                    continue;
                }
                str += ('&' + key + '=');
                str += encodeURIComponent(val.replace(/[\t\ ]+/g, ' '));
            }
            return str.slice(1);
        };
        this.preview = function () {
            return this.getRelay() + '?' + this.encodeObj();
        };
        this.locate = function () {
            W.location.href = this.preview();
        };
        this.post = function (cb) {
            $.ajax({
                url: relay,
                type: 'post',
                datatype: 'json',
                data: {
                    to: this.to,
                    sub: this.sub,
                    from: this.from,
                    cc: this.cc,
                    msg: this.msg,
                    pic: this.pic,
                    key: this.key,
                },
                success: function () {
                    if (W.debug > 1) {
                        C.debug(Nom, 'success', arguments);
                    }
                    cb(); // close relay
                },
                error: function () {
                    // probably done but origin access prohibited
                    C.debug(Nom, 'forced post', arguments);
                    cb();
                },
            });
        };
    }

    return Mailer;
});
/*



 */
