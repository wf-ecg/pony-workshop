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

define(['jquery', 'lodash', 'share', 'libs/utils'], function
    ($, _, Share) {
    'use strict';

    var Nom = 'Main';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

// EXPOSE
    var self = {}, ele, share;
    W.Main = self;

    ele = {
        share: '.share-btn',
        sharing: '.sharing',
    };

    self.lookups = {
        hash: 'flow works offers quiz credit stars video'.split(' '),
        navs: []
    };

// HELPERS
    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    function _shareResult() {

        if (share) {
            share.disarm(); // disarm share events + do callback
        }
        share = new Share(ele.sharing, {
            tokens: {// inside template
                //file_name: rank,
                //badge_name: rank,
            },
            callback: function () { // callback after share
                //showResult();
            },
        });

        ele.mid.revealOnly(ele.sharing);
    }

    function bindings() {
        $.watchInputDevice();
        $.reify(ele);

        $(W).mediate('resize', 333, ns('resize')) //
            .trigger('resize'); // jiggle the lever

        $('a').on(ns('click'), function (evt) {
            if ($(this).attr('href') === '#') {
                evt.preventDefault();
                W.alert('Go Somewhere / Do Something');
            }
        });

        $('body').removeClass('loading');

        ele.share.on(ns('click'), function () {
            _shareResult();
        });

    }

    function init() {
        _.delay(bindings, 333);
    }

// PAGE LOADED
    $(init);
    require(['flatten']);
});
/*



 */
