/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2014

 USE
 manage swapping of images based on hover state

 TODO
 loosely load
 take custom event array
 */

define(['jquery'], function
    KLASS($) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Hover';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});
    var Df = {
        sel: 'body',
        overstate: '', // '-over'
    };

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    function Src(dir, nom, ext) {
        this.dir = dir;
        this.nom = this._nom = nom;
        this.ext = ext;
    }
    Src.prototype.toString = function () {
        return (this.dir + '/' + this.nom + '.' + this.ext);
    };
    Src.prototype.rename = function (nom) { // blank resets name
        if (nom) {
            this.nom = this._nom + nom;
        } else {
            this.nom = this._nom;
        }
        return this.toString();
    };
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Hover(sel, cf) {
        cf = $.extend({}, Df, cf);
        sel = sel || cf.sel;

        var api, ele, src;

        ele = $(sel).first();  // wrap element
        ele = {
            main: ele,
        };
        api = ele.main.data(Nom); // possibly restore data
        src = ele.main.attr('src'); // track original value

//      PRIVATE
        function _bind() {
            ele.main.on(ns('over'), api.over);
            ele.main.on(ns('norm'), api.norm);
            api.path = _parseSourcePath();

            if (db(1)) {
                api[Nom + ':' + sel] = {
                    _closure: KLASS,
                    cf: cf,
                    ele: ele,
                };
                C.log(Nom + '<binding>', api, sel);
            }
        }
        function _parseSourcePath() {
            var arr, ext, nom, dir;

            arr = src.split('/');
            nom = arr.pop(); //      get basename
            dir = arr.join('/'); //  recreate dirname

            arr = nom.split('.');
            ext = arr.pop(); //      get file extention
            nom = arr.join('.'); //  recreate filename

            return new Src(dir, nom, ext);
        }

//      PUBLIC

        function destroy() {
            // TODO implement destructor?
        }

//      INIT

        if (!api) {
            api = $.extend(this, api, {
                path: null,
                norm: function () { // original source
                    ele.main.attr('src', api.path.rename()) //
                        .removeClass('j-hover');
                },
                over: function () { //
                    ele.main.attr('src', api.path.rename(cf.overstate))
                        .addClass('j-hover');
                },
                clear: destroy,
            });
            ele.main.data(Nom, api); // store api as data
        }
        _bind(); // instance
        return api;
    }

    return Hover;
});
/*



 */
