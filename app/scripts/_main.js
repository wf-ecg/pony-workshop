/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2014

 USE
 hook up various sub systems
 bind events
 store configs

 TODO
 document a bit
 modernize api
 loosely load
 change 'index' data to 'eq'
 */

define(['jquery', 'lodash',
    'libs/hover', 'libs/hash', 'libs/ratio', 'libs/speed',
    'quiz', 'reveal', 'slider',
    'jqxtn'], function
    ($, _, Hover, Hash, Ratio, Speed, Quiz, Reveal, Slider) {
    'use strict';

    var Nom = 'Main';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

// EXPOSE
    var self = {};
    W.Main = self;

    self.lookups = {
        hash: 'flow works offers quiz credit stars video'.split(' '),
        navs: []
    };

// HELPERS
    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    function lookupHash(str) {
        return _.indexOf(self.lookups.hash, str);
    }
    function lookupNavs(str) {
        return _.indexOf(self.lookups.navs, str);
    }
    function indexNavs() {
        var all = $('.w-nav-link[href]');

        all.each(function (i, e) {
            var nav = $(this);
            var url = nav.attr('href').slice(1).replace(/.*=/, '');
            var idx = lookupHash(url);

            if (idx > -1) {
                nav.data('index', idx);
                self.lookups.navs[i] = url;
            }
        });
    }

    function checkHash() {
        self.hash.check();
    }
    function gotoHash(evt, data) {
        data = self.hash.get();
        slideByName(data.s);
    }

    function bindings() {
        $(W).mediate('resize', 333, ns('resize')) //
            .trigger('resize'); // jiggle the lever

        $('a').on(ns('click'), function (evt) {
            if ($(this).attr('href') === '#') {
                evt.preventDefault();
                W.alert('Go Somewhere / Do Something');
            }
        });

        $('.w-nav-link').on(ns('click'), checkHash);
        $('body').removeClass('loading');

        watchInputDevice();
    }

    function init() {
        $.subscribe(ns('resize'), new Ratio(1.8, '.c-main'));

        self.hash = new Hash();

        $.subscribe(ns('resize'), gotoHash);
        $.subscribe('change.Hash', gotoHash);
        _.delay(bindings, 333);
    }

// PAGE LOADED
    $(init);
});
/*



 */
