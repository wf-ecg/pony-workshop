/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 recreated drt 2014

 USE
 control of a page

 TODO
 document a bit
 modernize api
 loosely load
 */

define(['stack', 'gareth', 'lodash'], function (Stack, dsfs, _) {
    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        U, El, self, stak;


    El = {
        can: '#can',
        cta: '#cta .ctaContainerInner',
        lnk: '#download',
        pre: '#PreviewPony',
        stk: '#Sticker img',
    };
    stak = new Stack();
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }
    function _makeStream(can, lvl) {
        return can.toDataURL('image/jpeg', lvl || 0.5);
    }

    function _makeName() {
        return 'pony' + $.now() + '::';
    }

    function _linkDownloadName(lnk, can, nom) {
        var dat = _makeStream(can);
        var gen = _makeName();

        // set POST data
        $('.js-picture').val(dat.replace(/^data:image\/jpeg;base64\,/, gen));

        lnk[0]['download'] = nom + '.jpg'; // try for download awareness

        if (lnk.attr('download')) {
            lnk.attr({
                href: dat,
            });
        } else { // using crap browser
            lnk.attr({
                download: null,
                href: dat, //.replace(/^data:image\/[^;]/, 'data:application/octet-stream'),
                target: '_blank',
            });
        }
        if (W.SHIET.trident) {
            lnk[0].href = '#';
            lnk[0].onclick = function (evt) {
                evt.preventDefault();
                var win;
                win = W.open('preview.html');
                win.document.writeln('<h4>Right-click to save your pony or set as background.</h4>');
                win.document.writeln('<img width=100% src="' + dat + '">');
                win.document.close();
            };
        }
    }
    // - - - - - - - - - - - - - - - - - -
    // DEPENZ

    function flatten() {
        var src = El.pre.css('background-image');
        var img = $('<img>').appendTo('body');

        src = src.match(/(http:.+jpg)/g);

        if (src && src[0]) {
            img.attr('src', src[0]);
        } else {
            return;
        }

        img.on('load', function () {
            stak.insertLayer(img[0], 1, 0, 0);
            stak.addLayer(El.stk[0], 0, 0);
            stak.drawOn(El.can[0]);

            _linkDownloadName(El.lnk, El.can[0], 'ponypic');
            img.remove();
        });

        stak.setOrigin(444, 111);
        El.pre.find('div img').not(El.stk) //
            .each(function (i, e) {
                stak.addLayer(e);
            });
    }

    function init() {
        $.reify(El);

        El.can.css({
            opacity: 0.0001 + (db(2) ? 1 : 0),
            position: 'absolute',
            zIndex: 0,
        });

        El.cta.on('mouseenter', flatten);

        W.flatten = self = {
            stak: stak,
            ele: El,
        };
    }

    $(init);
});
