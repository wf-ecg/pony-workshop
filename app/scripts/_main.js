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
            picture: $('.picture').val(), //'Happy Holidays to banking’s best marketing team',
            tokens: {// inside template
                picture: 'PPPIIICCC', //'http://ecg.hosting.wellsfargo.com/mfal/em/pony-workshop/images/email/pony.jpg',
                heading: 'Happy Holidays to banking’s <br>best marketing team.',
                message: ['I hope everyone is getting excited for the holidays and looking forward to spending time with family and friends.',
                    'The great work you have created and the solutions you have provided throughout this busy year should be celebrated, ',
                    'and I want to thank each and every one of your for reflecting Wells Fargo’s working together&nbsp;spirit.</p>',
                    '<p>So, to help celebrate your unique contributions, I want to invite you to visit the Pony Workshop',
                    'and create your own Wells Fargo pony. This will be a fun way to kick off the holiday season and',
                    'the Pony Workshop gives you lots of choices for designing a pony that is truly you. Be creative.',
                    'Be silly. Be stylish. Once you’re done, please share it with your fellow team members.',
                    'You can also download it as your desktop wallpaper to remind yourself just how important',
                    'your unique contributions to Wells Fargo are. I can’t wait to see what everyone comes up&nbsp;with.</p>',
                    '<p>Again, thank you for all of your work and continued dedication as we take on the new and',
                    'exciting opportunities waiting for us&nbsp;in&nbsp;2016.</p>',
                    '<p>Sincerely, <br>',
                    'Kellie Krug'].join('\n'),
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
