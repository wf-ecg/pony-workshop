/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2014

 USE
 gauge and track segmented space

 TODO
 document a bit
 modernize api
 loosely load
 */

define(['jquery'], function
    KLASS($) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Gauge';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});
    var Db = W.debug > 1;
    var Df = {
        sel: 'body',
        prop: 'outerWidth',
    };
    var K = {
        ns: function (str) {
            return (str || '') + '.' + Nom;
        },
    };
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Gauge(sel, cf) { // manage group by a property ('prop')
        cf = $.extend({}, Df, cf);
        sel = sel || cf.sel;

        var api, ele;

        ele = $(sel).first();
        ele = {
            main: ele,
            kids: ele.children(),
        };
        api = ele.main.data(Nom); // possibly restore data

        function _bind() {
            ele.kids.appendTo(ele.main); // clean out whitespace
            api.index();

            if (Db) {
                api[Nom + ':' + sel] = {
                    _closure: KLASS,
                    cf: cf,
                    ele: ele,
                };
                C.log(Nom + '<binding>', api);
            }
        }

//      PUBLIC

        function makeIndex() { // store [prop]s for each kid
            var index = [0];

            ele.kids.each(function (i, e) {
                var pre = parseInt(index.slice(-1), 10);

                index.push(pre + $(e)[cf.prop]());

                $(this).data()[Nom] = {// store item num
                    eq: i,
                };
            });
            index.total = index.slice(-1)[0]; // last [prop] of last [kid]
            return index;
        }

//      INIT

        if (!api) {
            api = $.extend(this, api, {
                index: makeIndex,
                length: function () { // how many sub-items
                    return ele.kids.length;
                },
                pick: function (idx) { // pick index
                    idx = ele.kids.eq(idx || 0);

                    return idx[cf.prop]();
                },
                toString: function () { // roughly dump to string
                    return ele.kids.map(function (i, e) {
                        return e.toString();
                    }).toArray().join('+');
                },
            });
            ele.main.data(Nom, api); // store api as data
        }
        _bind(); // instance
        return api;
    }

    return Gauge;
});
/*



 */
