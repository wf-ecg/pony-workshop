/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 recreated drt 2016

 USE
 hook up various sub systems
 bind events
 store configs

 TODO
 document a bit
 */
require(['../config'], function () {
    require(['jquery', 'lodash', 'share', 'jqxtn'], Main);
});
function Main($, _, Share) {
    'use strict';

    var Nom = 'Main',
        W = (W && W.window || window),
        C = (W.C || W.console || {}),
        El, self, share;

    El = {
        cta: '.ctaContainerOuter .ctaContainerInner',
        email: '.js-email',
        progitems: '#ProgressBar .item',
        share: '.share-btn', // TODO remove
        sharing: '.sharing',
    };
    self = {
        imageDir: 'ponies/',
        relayLoc: 'http:/' + '/ecgsolutions.hosting.wellsfargo.com/',
    };
    // - - - - - - - - - - - - - - - - - -
    // HELPERS

    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    function makeSrcAttr(nom) {
        return 'src="' + self.relayLoc + self.imageDir + nom + '.jpg"';
    }

    function shareResult(evt) {
        evt.preventDefault();

        var pic = $('.js-picture').val();
        var src = makeSrcAttr(pic.split('::')[0]);

        if (share) {
            share.disarm(); // disarm share events + do callback
        }
        share = new Share(El.sharing, {
            picture: pic,
            subject: 'I created my own pony using Wells Fargo Pony Workshop',
            tokens: {// inside template
                heading: 'Take a peek at my pony!',
                message: '',
                picture: src,
            },
            callback: function () { // callback after share
                El.sharing.hide();
            },
        });

        El.sharing.show();
    }

    function activateTOC(Gar) {
        $(El.progitems).each(function (i, e) {
            var me = $(e);

            me.data('Step', i).on(ns('click'), function () {
                Gar.roll(me.data('Step'));
            });
        });
    }

    function gatherLayers(Flatten) {
        El.cta.on(ns('mouseenter'), Flatten.ponyLayers);
    }

    function bindings() {
        $.watchHash();
        $.watchInputDevice();

        require(['gareth'], activateTOC);
        require(['flatten'], gatherLayers);

        El.email.on(ns('click'), shareResult);
    }

    function init() {
        $.doneLoading();
        $.markAgent();
        $.reify(El);
        bindings();

        // EXPOSE
        if (W.debug > 0) {
            self.el = El;
            self.share = share;
            C.info(Nom, self);
        }
    }
    // - - - - - - - - - - - - - - - - - -
    W[Nom] = self;
    $(init);
}
/*




 */
