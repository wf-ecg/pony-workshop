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


        var user = new User(123);
        user.set('name', 'Wolfgang');

        W.x = X = {
            U: User,
            G: GS,
            u: user,
            o: new GS(),
        };
        X.o.gs('g');

        C.info(X);
    });

});

/*



 */
