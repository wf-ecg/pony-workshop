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

    var Nom = 'Main',
        W = (W && W.window || window),
        C = (W.C || W.console || {}),
        El, self = {}, share;

    El = {
        email: '#emailer',
        share: '.share-btn',
        sharing: '.sharing',
    };
    // - - - - - - - - - - - - - - - - - -
    // HELPERS

    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    function _shareResult() {

        if (share) {
            share.disarm(); // disarm share events + do callback
        }
        self.Share = share = new Share(El.sharing, {
            subject: 'Happy Holidays to banking’s best marketing team',
            tokens: {// inside template
                //file_name: rank,
                //badge_name: rank,
            },
            callback: function () { // callback after share
                El.sharing.hide();
            },
        });

        El.sharing.show();
    }

    function bindings() {
        $.watchInputDevice();
        $.reify(El);

        $('body').removeClass('loading');

        El.email.on('click', function () {
            _shareResult();
        });

    }

    function init() {
        _.delay(bindings, 333);

        // EXPOSE
        W.Main = self;
        self.El = El;
    }
    // - - - - - - - - - - - - - - - - - -
    // LOADED

    $(init);
    require(['flatten']);
});
/*



 */
