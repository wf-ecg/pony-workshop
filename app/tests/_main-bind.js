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
    require.config({baseUrl: '..'});

    require(['jquery', 'tests/gs', 'tests/user'], function ($, GS, User) {
        var W = (W && W.window || window),
            C = (W.C || W.console || {}),
            D = W.document,
            U, X;


        var u1 = new User(1);
        u1.set('name', 'Bob');
        u1.set('number', '111');

        var u2 = new User(2);
        u2.set('name', 'Cat');
        u2.set('number', '222');

        W.x = X = {
            U: User,
            G: GS,
            u1: u1,
            u2: u2,
            o: new GS(),
        };
        X.o.gs('g');

        C.info(X);
    });

});

/*



 */