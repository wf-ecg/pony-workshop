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

    var canvas = D.getElementById('effectsCanvas');
    var context = canvas.getContext('2d');
    var destX = 0;
    var destY = 0;
    var imageEle = new Image();
    var img = new Img(imageEle);

    W.Main = {
        imgO: img, // my wrapper
        canE: canvas, // html element
        imgE: imageEle, // html element
        canO: context, // canvas innards
    };

    imageEle.onload = function () {
        var imgData, pixels;

        context.drawImage(imageEle, destX, destY);

        imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        pixels = imgData.data;

        img.setData(pixels);
        img.makeGray();
        img.modAlpha(2);

        context.putImageData(imgData, 0, 0);
    };

    imageEle.src = './images/backgrounds/background_spring.png';

});
/*



 */
