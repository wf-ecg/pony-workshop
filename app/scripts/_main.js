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
    function slideByName(nom) { // when a slide is "chosen"
        var idx, num;
        nom = nom || self.lookups.hash[0];
        num = lookupHash(nom);
        idx = lookupNavs(nom);

        $('.w-nav-link') // set nav color
            .removeClass('active').eq(idx).addClass('active');

        self.slider1.page(num); // scroll big slide
        self.slider2.page(num) // activate small slide
            .find('.w-slide').removeClass('active').eq(num).addClass('active');

    }
    function togArrows(evt) {
        var arrows = self.slider2.find('[class*="w-slider-arrow-"]') //
            .removeClass('inactive');

        if (evt.type === 'min')
            arrows.eq(0).addClass('inactive');
        if (evt.type === 'max')
            arrows.eq(1).addClass('inactive');
    }
    function foolValidator() {
        $('div[title]').each(function (i, e) {
            var me = $(this), tmp;
            tmp = me.attr('title');
            me.attr('alt', tmp).attr('title', '');
        });
    }
    function watchInputDevice() {
        var body = $('body').on('keydown', function () {
            body.removeClass('mouse').addClass('keyboard');
        }).on('mousemove', function () {
            body.removeClass('keyboard').addClass('mouse');
        });
    }

    function bindings() {
        $(W).mediate('resize', 333, ns('resize')) //
            .trigger('resize'); // jiggle the lever

        if (self.quiz)
            self.quiz.find('.q-close').add('.w-nav') //
                .on(ns('click'), function () {
                    self.reveal.pct();
                    self.quiz.reset();
                });

        if (self.slider1)
            self.slider1.find('.w-slider-arrow-left, .w-slider-arrow-right') //
                .eq(0).on(ns('click'), function () {
                self.slider1.prev();
                self.slider2.prev();
            }).end() //
                .eq(1).on(ns('click'), function () {
                self.slider1.next();
                self.slider2.next();
            }).end().end();

        if (self.slider2)
            self.slider2.find('.w-slider-arrow-left, .w-slider-arrow-right') //
                //.on(ns('click'), self.slider2.page) //
                .eq(0).constantEvent('mouseover', 'mouseout', function () {
                self.slider2.move(-self.speed.climb());
            }, 66).end() //
                .eq(1).constantEvent('mouseover', 'mouseout', function () {
                self.slider2.move(self.speed.climb());
            }, 66).end().end() //
                .on(ns('click'), '.w-slide', function () {
                    checkHash();
                    self.reveal.pct();
                    self.quiz.reset();
                });

        $('.j-dropdown').on(ns('click'), function () {
            var me = $(this);
            $('.j-dropdown').not(me).removeClass('active');
            me.toggleClass('active');
            _.delay(function () {
                $('body').one(ns('click'), function () {
                    me.removeClass('active');
                });
            });
            $('body').off(ns('click'));
        });

        $('.j-revealer').on(ns('click'), function () {
            self.reveal.pct(100);
        });

        $('.j-pdfer').on(ns('click'), function () {
            $(this).parent().find('.c-nuggets').toggle() //
                .find('a').attr('target', 'external');
        });

        $('.w-slide a img').each(function () {
            var me = $(this);
            var api = new Hover(me);
            me.on(ns('mouseover'), api.over);
            me.on(ns('mouseout'), api.norm);
        });

        $('a').on(ns('click'), function (evt) {
            if ($(this).attr('href') === '#') {
                evt.preventDefault();
                W.alert('Go Somewhere / Do Something');
            }
        });

        $('.w-nav-link').on(ns('click'), checkHash);
        $('body').removeClass('loading');

        indexNavs();
        foolValidator();
        watchInputDevice();
    }

    function init() {
        $.subscribe(ns('resize'), new Ratio(1.8, '.c-main'));

        self.hash = new Hash();
        self.speed = new Speed(9);
        self.reveal = new Reveal('.c-slider-big', '.c-reveal');
        self.slider1 = new Slider('.c-slider-big');
        self.slider2 = new Slider('.c-slider-small');
        self.quiz = new Quiz('#Quiz1', {
            limit: 5,
            delay: 2222,
            random: true,
            meter: '.m-meter',
        });

        $.subscribe(ns('resize'), gotoHash);
        $.subscribe('change.Hash', gotoHash);
        $.subscribe('max.Slider mid.Slider min.Slider', togArrows);
        _.delay(bindings, 333);
    }

// PAGE LOADED
    $(init);
});
/*



 */
