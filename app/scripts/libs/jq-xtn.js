/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {});
    var Db = W.debug > 1;

// PUB SUBS
    var Q = $.pubsubs = $({});

    $.publish = function () { // o.trigger.bind(o)
        Q.trigger.apply(Q, arguments);
    };
    $.subscribe = function () { // o.on.bind(o)
        Q.on.apply(Q, arguments);
    };
    $.unsubscribe = function () { // o.off.bind(o)
        Q.off.apply(Q, arguments);
    };
    $.fn.mediate = function (event, limit, topic) {
        return this.on(event, _.debounce(function (evt) {
            $.publish(topic, evt);
        }, limit));
    };

// NEW

    $.fn.activate = function (bool) {
        var ele = $(this);
        if (bool) {
            ele.removeClass('inactive');
        } else {
            ele.addClass('inactive');
        }
    };

// ETC

    $.altTitles = function () {
        $('*').each(function () {
            var me = $(this);
            me.attr('title', me.attr('alt'));
        });
    };

    $.fn.constantEvent = function (evn1, evn2, fn, ms) {

        return this.each(function () {
            var me = $(this), time;

            me.on(evn1, function () {
                if (!time) {
                    time = W.setInterval(fn, ms || 33);
                }
            }).on(evn2, function () {
                W.clearInterval(time);
                time = null;
            });

            return function () {
                W.clearInterval(time);
            };
        });

    };

    $.fn.stretchTo = function (wid) {
        wid = (typeof wid === 'string' ? wid : 0);
        return this.each(function () {
            var me = $(this), dd = me.data();

            me.memwidth().css({
                display: 'inline-block',
                width: dd.memwidth, /*explicitly set width*/
            }).stop().animate({
                width: wid,
            }, 333, function () {
                me.addClass('stretch').css({
                    display: wid ? '' : 'none',
                });
            });
        });
    };

    $.fn.unstretch = function () {
        return this.each(function () {
            var me = $(this), dd = me.data();

            me.css({
                display: 'inline-block',
            }).stop().animate({
                width: dd.memwidth,
            }, //
                333, function () {
                    me.removeClass('stretch').css({
                        display: '',
                        width: dd.memwidth,
                    });
                });
        });
    };

    $.fn.readwidths = function (num) {
        var str;

        if (typeof num === 'string') {
            if (num === 'equal') {
                str = 100 / this.length + '%';
            } else if (num === 'overflo') {
                str = 100 / (this.length - 1) + '%';
            } else if (num === 'initial') {
                str = 'initial';
            }
        }

        return this.each(function () {
            var me = $(this),
                dd = me.data();

            me.css({
                width: str || dd['width' + num],
            });
        });
    };

    $.deparam = function (params, coerce) {
        // extraction of the deparam method from http://benalman.com/projects/jquery-bbq-plugin/
        var obj = {},
            coerce_types = {'true': !0, 'false': !1, 'null': null};

        // Iterate over all name=value pairs.
        $.each(params.replace(/\+/g, ' ').split('&'), function (j, v) {
            var param = v.split('='),
                key = decodeURIComponent(param[0]),
                val,
                cur = obj,
                i = 0,
                // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
                // into its component parts.
                keys = key.split(']['),
                keys_last = keys.length - 1;

            // If the first keys part contains [ and the last ends with ], then []
            // are correctly balanced.
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
                // Remove the trailing ] from the last keys part.
                keys[keys_last] = keys[keys_last].replace(/\]$/, '');

                // Split first keys part into two parts on the [ and add them back onto
                // the beginning of the keys array.
                keys = keys.shift().split('[').concat(keys);

                keys_last = keys.length - 1;
            } else {
                // Basic 'foo' style key.
                keys_last = 0;
            }

            // Are we dealing with a name=value pair, or just a name?
            if (param.length === 2) {
                val = decodeURIComponent(param[1]);

                // Coerce values.
                if (coerce) {
                    val = val && !isNaN(val) ? +val              // number
                        : val === 'undefined' ? undefined         // undefined
                        : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
                        : val;                                                // string
                }

                if (keys_last) {
                    // Complex key, build deep object structure based on a few rules:
                    // * The 'cur' pointer starts at the object top-level.
                    // * [] = array push (n is set to array length), [n] = array if n is
                    //   numeric, otherwise object.
                    // * If at the last keys part, set the value.
                    // * For each keys part, if the current level is undefined create an
                    //   object or array based on the type of the next keys part.
                    // * Move the 'cur' pointer to the next level.
                    // * Rinse & repeat.
                    for (; i <= keys_last; i++) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last ?
                            cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) :
                            val;
                    }

                } else {
                    // Simple key, even simpler rules, since only scalars and shallow
                    // arrays are allowed.

                    if ($.isArray(obj[key])) {
                        // val is already an array, so push on the next value.
                        obj[key].push(val);

                    } else if (obj[key] !== undefined) {
                        // val isn't an array, but since a second value has been specified,
                        // convert val into an array.
                        obj[key] = [obj[key], val];

                    } else {
                        // val is a scalar.
                        obj[key] = val;
                    }
                }

            } else if (key) {
                // No value was defined, so set something meaningful.
                obj[key] = coerce ?
                    undefined :
                    '';
            }
        });
        return obj;
    };

});
/*



 */
