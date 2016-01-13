/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    // - - - - - - - - - - - - - - - - - -
    // AUTOMATE
    $.reify = function (obj) { // replace vals(selectors) with elements
        $.each(obj, function (i, sel) {
            obj[i] = $(sel);
        });
    };

    // - - - - - - - - - - - - - - - - - -
    // PUBSUBS
    $.pubsubs = $({});
    $.publish = function () {
        $.pubsubs.trigger.apply($.pubsubs, arguments);
    };
    $.subscribe = function () {
        $.pubsubs.on.apply($.pubsubs, arguments);
    };
    $.unsubscribe = function () {
        $.pubsubs.off.apply($.pubsubs, arguments);
    };
    $.fn.mediate = function (event, limit, topic) {
        return this.on(event, _.debounce(function (evt) {
            $.publish(topic, evt);
        }, limit));
    };

    // - - - - - - - - - - - - - - - - - -
    // FREEZE
    $.fn.freeze = function () {
        var poses = this.map(function () {
            return $(this).position();
        });
        return this.each(function (i, e) {
            $(e).css(poses[i]);
        }).addClass('freeze');
    };
    $.fn.unfreeze = function () {
        return this.css({top: '', left: ''}).removeClass('freeze');
    };
    $.fn.freezeKids = function () {
        this.css({height: this.height(), width: this.width()});
        this.children().freeze();
        return this;
    };
    $.fn.unfreezeKids = function () {
        this.css({height: '', width: ''});
        this.children().unfreeze();
        return this;
    };

    // - - - - - - - - - - - - - - - - - -
    // WATCHERS
    $.watchHash = function () {
        function trackHash() {
            var self = trackHash,
                hash = W.location.hash.slice(1),
                prev = self.previous;
            if (prev !== hash) {
                $('html').removeClass(prev).addClass(hash);
                self.previous = hash;
            }
            return self;
        }
        $(W).on('hashchange', trackHash());
    };
    $.watchInputDevice = function () {
        $('body').on('keydown', function () {
            $(this).removeClass('mouse');
            $(this).addClass('keyboard');
        }).on('mouseover', function () { // `mousemove` has side effects on windows browsers
            $(this).removeClass('keyboard');
            $(this).addClass('mouse');
        });
    };
    $.watchResize = function (fn, ns) {
        ns = 'resize.' + (ns || 'Util');
        $(W).off(ns);
        if (fn) {
            fn();
            $(W).on(ns, fn);
        }
    };
    $.swallowBackspace = function () {
        $(W.document).on('keydown', function (evt) {
            var ele = $(evt.target || evt.srcElement);
            if (evt.keyCode === 8 && !ele.is('input,[contenteditable="true"],textarea')) {
                evt.preventDefault();
            }
        });
    };
    $.markAgent = function () {
        var ua = W.navigator.userAgent;

        $.watchResize(function () {
            if (ua.match(/mobi/i) ||
                $(W).width() < 768) { // simulate
                $('html').addClass('mobi');
            } else {
                $('html').removeClass('mobi');
            }
            if (ua.match(/chrome/i)) {
                $('html').addClass('chrome');
            } else if (ua.match(/safari/i)) {
                $('html').addClass('safari');
            } else if (ua.match(/firefox/i)) {
                $('html').addClass('firefox');
            } else if (ua.match(/trident/i)) {
                $('html').addClass('trident');
            }
        }, 'markAgent');
    };

    // - - - - - - - - - - - - - - - - - -
    // HELPERS
    $.swapper = function (arr, a, b) {
        var c = arr[a];
        arr[a] = arr[b];
        arr[b] = c;
    };

    $.shuffler = function (array) {
        var arr = array.concat(),
            rem = arr.length,
            swap = function (a, b) {
                $.swapper(arr, a, b);
            };
        while (rem--) {
            swap(rem, Math.floor(Math.random() * (rem + 1)));
        }
        return arr;
    };

    $.doneLoading = function () {
        $('.loading').removeClass('loading');
    };

});
/*



 */
