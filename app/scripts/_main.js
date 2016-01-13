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

    function nameJpeg(nom) {
        return  'src="' + self.relayLoc + 'ponies/' + nom + '.jpg"';
    }

    function _shareResult() {
        var pic = $('.picture').val();
        var nom = nameJpeg(pic.split('::')[0]);

        if (share) {
            share.disarm(); // disarm share events + do callback
        }
        self.Share = share = new Share(El.sharing, {
            subject: 'I created my own pony using Wells Fargo Pony Workshop',
            picture: pic,
            tokens: {// inside template
                picture: nom,
                heading: 'Take a peek at my pony!',
                message: '',
            },
            callback: function () { // callback after share
                El.sharing.hide();
            },
        });

        El.sharing.show();
    }

    function bindings() {
        $.watchInputDevice();
        $.markAgent();
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
        self.relayLoc = 'http:/' + '/ecgsolutions.hosting.wellsfargo.com/';
    }
    // - - - - - - - - - - - - - - - - - -
    // LOADED

    $(init);
    require(['flatten']);
});
/*

 /adp2.hosting.wellsfargo.com/
 /ecgsolutions.hosting.wellsfargo.com/
 /10.89.101.100/wf-ecg/pony-workshop/0/


 */
