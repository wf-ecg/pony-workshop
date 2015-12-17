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

define(['stack', 'gareth'], function (Stack) {
    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        U, El, self, stak;


    El = {
        can: '#can',
        cta: '#cta .ctaContainerInner',
        lnk: '#download',
        pre: '#previewPony',
        stk: '#stickerDiv img',
    };
    stak = new Stack();
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    function _makeStream(can) {
        return can.toDataURL('image/jpeg', 0.75);
    }
    function _scaleIt(can) {
        var ctx = can.getContext('2d');
        ctx.scale(0.1, 0.1);

        return can.toDataURL('image/jpeg', 0.75);
    }
    function _forceParent(lnk, dat) {
        var div = lnk.parent();
        var img = $('#DL-preview');

        if (!img.length) {
            img = $('<img>').appendTo(div);
        }

        img.css({
            width: '100%',
        }).attr({
            id: 'DL-preview',
            src: dat,
            type: 'image/jpeg',
        }).slideDown();
    }

    function _linkDownloadName(lnk, can, nom) {
        var dat = _makeStream(can);

        lnk[0]['download'] = nom + '.jpg';

        if (!lnk.attr('download')) {
            _forceParent(lnk, dat);
            if (!lnk.next().is('.dl-note')) {
                $('<div>').addClass('dl-note') //
                    .text('Right-click to name and save this jpeg.') //
                    .insertAfter(lnk);
            }
        } else {
            lnk.attr('href', dat.replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
        }
        $('.picture').val(_scaleIt(can).replace(/^data:image\/jpeg;base64\,/, ''));
    }
    // - - - - - - - - - - - - - - - - - -
    // DEPENZ

    function flatten() {
        var src = El.pre.css('background-image');
        var img = $('<img>').appendTo('body');

        src = src.match(/(http:.+jpg)/g)[0];
        img.attr('src', src);

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
            opacity: 0.0001 + (W.debug > 1 ? 1 : 0),
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
