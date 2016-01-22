/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 recreated drt 2016

 USE
 hackey as hell

 TODO
 document a bit
 */

define(['jquery', 'stack', 'gareth'], function ($, Stack) {
    var Nom = 'Flatten',
        W = (W && W.window || window),
        C = (W.C || W.console || {}),
        U, El, self,
        stack = new Stack();

    El = {
        can: 'canvas:first',
        cta: '.ctaContainerOuter .ctaContainerInner',
        lnk: '.js-download:first',
        pic: '.js-picture',
        pre: '#PreviewPony',
        stk: '#Sticker img',
    };
    self = {
        el: El,
        stack: stack,
        msg: '<h4>Right-click to save your pony or set as background.</h4>',
    };
    // - - - - - - - - - - - - - - - - - -
    // HELPERS

    function ns(str) {
        return (str || '') + '.' + Nom;
    }
    function _makeStream(can, lvl) {
        return can.toDataURL('image/jpeg', lvl || 0.5);
    }
    function _makeName() {
        return 'pony' + $.now() + '::';
    }
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    function makeDownloadLink(lnk, can, nom) {
        var dataUrl = _makeStream(can);
        var nomTime = _makeName();

        // store POST data
        El.pic.val(dataUrl.replace(/^data:image\/jpeg;base64\,/, nomTime));

        lnk[0]['download'] = (nom + '.jpg');
        // has browser accepted download this property/attr?
        if (lnk.attr('download')) {
            lnk.attr({
                href: dataUrl,
            });
        } else { // using crap browser
            lnk.attr({
                download: null,
                href: dataUrl,
                target: '_blank',
            });
        }
        // override link for msie and make new window
        if (W.SHIET.trident) {
            lnk[0].href = '#';
            lnk[0].onclick = function (evt) {
                evt.preventDefault();

                var win = W.open('preview.html');

                win.document.writeln(self.msg);
                win.document.writeln('<img width=100% src="' + dataUrl + '">');
                win.document.close();
            };
        }
    }

    function gatherLayers() {
        var src = El.pre.css('background-image');
        var img = $('<img>').appendTo('body');

        // attach css background as img for extraction
        src = src.match(/(http:.+jpg)/g);
        if (src && src[0]) {
            img.attr('src', src[0]);
        } else {
            return;
        }
        // all layers are loaded
        img.on(ns('load'), function () {
            stack.insertLayer(img[0], 1, 0, 0);
            stack.addLayer(El.stk[0], 0, 0);
            stack.drawOn(El.can[0]);

            makeDownloadLink(El.lnk, El.can[0], 'ponypic');
            img.remove();
        });
        // inset for pony parts
        stack.setOrigin(444, 111);
        // layer each part
        El.pre.find('div img').not(El.stk).each(function (i, e) {
            stack.addLayer(e);
        });
    }

    function binding() {
        El.can.css({// do not readily show the canvas
            opacity: 0.0001 + ((W.debug > 2) ? 1 : 0),
            position: 'absolute',
            zIndex: 0,
        });
        // trigger this mess
        El.cta.on(ns('mouseenter'), gatherLayers);
    }

    function init() {
        $.reify(El);
        binding();

        // EXPOSE
        W[Nom] = self;
    }
    // - - - - - - - - - - - - - - - - - -
    $(init);
});
/*

 .replace(/^data:image\/[^;]/, 'data:application/octet-stream'),


 */
