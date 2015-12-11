/*jslint white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE
 store configs

 TODO
 document a bit
 */
require(['../config'], function () {

    require(['jquery', 'test/box'], function ($, Box) {
        function id(id){return document.getElementById(id)}
        function dom(fn){document.addEventListener('DOMContentLoaded',fn)}

        var o = {
            s1: 'rgba(200, 0, 0, 0.5)',         s2: 'rgba(0, 200, 0, 0.5)',         s3: 'rgba(0, 0, 200, 0.5)',
            i1: id('img1'),                     i2: id('img2'),                     i3: id('img3'),
            c1: id('can1').getContext('2d'),    c2: id('can2').getContext('2d'),    c3: id('can3').getContext('2d'),
        };

        function saveCanvas(ctx) {
            o.w1 = window.open();
            o.w1.document.title = 'foo';
            o.w1.location = ctx.canvas.toDataURL('image/png');
            return o.w1;
        }
        o.b = new Box(); console.debug(o.b, o.b.br.moveBy(99), o.b.moveTo(-33));

        // set colors
        o.c1.fillStyle = o.s1;
        o.c2.fillStyle = o.s2;
        o.c3.fillStyle = o.s3;
        // draw squares
        o.c1.fillRect(22, 33, 55, 55); // red
        o.c2.fillRect(33, 44, 55, 55); // green

        o.c1.globalAlpha = 0.5; // start applying @ 50%
        o.c1.save();

        o.c1.drawImage(o.i1, 0, 0);
        o.c2.drawImage(o.i2, 55, 55);

        o.d1 = o.c1.getImageData(0, 0, o.c1.canvas.width, o.c1.canvas.height);
        o.d2 = o.c2.canvas;

        o.c3.putImageData(o.d1, 0, 0);
        o.c3.drawImage(o.d2, 0, 0);

        console.log('o', o); //, saveCanvas(o.c3)
    });

});

/*



 */
