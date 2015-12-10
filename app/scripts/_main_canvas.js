/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE
 store configs

 TODO
 document a bit
 */

define(['img'], function (Img) {
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

    var img = new Img();
    var canvas = D.getElementById('effectsCanvas');
    var context = canvas.getContext('2d');
    var destX = 0;
    var destY = 0;
    var imageObj = new Image();

    imageObj.onload = function () {
        var imgData, pixels;
        context.drawImage(imageObj, destX, destY);

        imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        pixels = imgData.data;
        img.setData(pixels);
        img.makeGray();
        img.modAlpha(2);
        context.putImageData(imgData, 0, 0);
    };

    imageObj.src = './images/backgrounds/background_spring.png';

});
/*



 */
