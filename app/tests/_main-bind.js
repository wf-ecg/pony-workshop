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

    require(['jquery', 'tests/user'], function ($, User) {
        var W = (W && W.window || window),
            C = (W.C || W.console || {}),
            D = W.document,
            U, X;


        var user = new User(123);
        user.set('name', 'Wolfgang');

        X = {
            u: user,
            U: User,
        };
        W.x = X;
    });

});

/*



 */
