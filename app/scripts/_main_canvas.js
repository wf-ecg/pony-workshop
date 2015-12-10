/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE
 store configs

 TODO
 document a bit
 */

define(['imgWrap'], function (Img) {
    'use strict';
    var Nom = 'Main';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});
    var D = W.document;

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    if (!D.createElement('canvas').getContext) {
        return D.writeln('Your browser does not support Canvas.');
    }
    // - - - - - - - - - - - - - - - - - -

    var canE = D.getElementById('effectsCanvas');
    var canO = canE.getContext('2d');
    var imgE = new Image();

    imgE.onload = function () {
        var wrap = new Img(imgE, canE);

        wrap.draw(); // dump in the file top-left
        wrap.makeGray();
        wrap.modAlpha(0.5);

        W.Main = {
            canE: canE, // html element
            canO: canO, // canvas innards
            imgE: imgE, // html element
            wrap: wrap, // my wrapper
        };
        C.debug(Nom, W.Main);
    };
    imgE.src = './images/backgrounds/background_spring.png';

});
/*



 */