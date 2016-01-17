/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE
 store configs

 TODO
 document a bit
 */
require(['../../config'], function () {
    require.config({
        baseUrl: '../../scripts',
        deps: ['../../config']
    });
    require(['test/img/imgwrap'], function (Img) {
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
            return D.writeln('no canvas support');
        }
        // - - - - - - - - - - - - - - - - - -

        var canE = D.getElementById('effectsCanvas');
        var canO = canE.getContext('2d');
        var imgE = new Image();

        imgE.onload = function () {
            var wrap = new Img(imgE, canE);

            wrap.dump(); // original image
            wrap.modAlpha(0.5);
            wrap.stamp(111, 111);
            wrap.makeGray();
            wrap.stamp(222, 222);

            W.Main = {
                canE: canE, // html element
                canO: canO, // canvas innards
                imgE: imgE, // html element
                wrap: wrap, // my wrapper
            };
            C.debug(Nom, W.Main);
        };
        imgE.src = '../images/background_spring.png';

    });
});
/*



 */
