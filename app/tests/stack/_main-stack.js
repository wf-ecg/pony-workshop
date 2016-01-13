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
    require(['jquery', 'test/stack'], function ($, Stack) {
        var W = (W && W.window || window),
            C = (W.C || W.console || {}),
            D = W.document,
            U;

        function id(str) {
            return document.getElementById(str);
        }

        W.o = {
            i1: id('img1'),
            i2: id('img2'),
            c1: id('can1'),
            c2: id('can2'),
        };
        W.s = new Stack();

    });

});

/*



 */
