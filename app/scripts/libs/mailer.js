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
    var Nom = 'Mailer';
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Db = W.debug > 1;

    var relay;
    relay = 'http://adp2.hosting.wellsfargo.com/lib/relay2.php';
    relay = 'http://ecgsolutions.hosting.wellsfargo.com/lib/relay2.php';
    relay = 'http://10.89.101.100/wf-ecg/pony-workshop/0/relay2.php';

    return function Mailer(to, from, sub, msg, cc, pic) {
        this.to = to;
        this.from = from;
        this.sub = sub || 'Howdy';
        this.msg = msg || 'howdy there pardner...' + new Date();
        this.cc = cc || '';
        this.pic = pic || '';
        this.key = '***';

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
        this.get = function (cb) {
            var test = $('<div>'),
                text = this.preview();

            test.appendTo('body').hide() //
                .load(text, function (rez) {
                    C.log(text, rez);
                    cb();
                    test.remove();
                });
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
                success: function (from) {
                    C.debug('success', from);
                    cb();
                    // close relay
                },
                error: function () {
                    // probably done but origin access prohibited
                    C.debug('forced post', from);
                    cb();
                },
            });
        };
    };
});
/*



 */
