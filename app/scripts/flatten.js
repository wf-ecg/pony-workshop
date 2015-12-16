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
        U;

    var stak = new Stack();
    var ele = '#previewPony';
    var lnk = '#download';
    var can = '#can';
    var stkr = '#stickerDiv img';

    function makeStream(can) {
        var str = can.toDataURL('image/jpeg', 0.75);

        return str;
    }
    function forceParent(lnk, dat) {
        var ele = lnk.parent();
        var img = $('#DL-preview');

        if (!img.length) {
            img = $('<img>').appendTo(ele);
        }

        img.hide().css({
            width: '100%',
        }).attr({
            'src': dat,
            'type': 'image/jpeg',
            'id': 'DL-preview',
        }).slideDown();
    }

    function linkDownloadName(ele, can, nom) {
        ele[0].download = nom + '.jpg';
        var dat = makeStream(can);

        if (!lnk.attr('download')) {
            forceParent(lnk, dat);
            if (!lnk.next().is('.dl-note')) {
                $('<div>').addClass('dl-note') //
                    .text('Right-click to name and save this jpeg.') //
                    .insertAfter(lnk);
            }
        } else {
            dat = dat.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
            ele.attr('href', dat);
        }
    }

    function addBkgr(stak) {
        var src = ele.css('background-image');
        var img = $('<img>').appendTo('body');

        src = src.match(/(http:.+jpg)/g)[0];
        img.attr('src', src);

        img.on('load', function () {
            stak.insertLayer(img[0], 1, 0, 0);
            stak.addLayer(stkr[0], 0, 0);

            stak.drawOn(can[0]);
            linkDownloadName(lnk, can[0], 'ponypic');
            img.remove();
        });
    }

    function doit(evt) {
        addBkgr(stak);

        stak.setOrigin(444, 111);
        ele.find('div img').not(stkr) //
            .each(function (i, e) {
                stak.addLayer(e);
            });
    }

    function init() {
        ele = $(ele);
        lnk = $(lnk);
        $('#cta .ctaContainerInner').on('mouseenter', doit);
        can = $(can).css({
            zIndex: 0,
            opacity: 0.05,
            position: 'absolute',
        });
        stkr = $(stkr);
    }

    W.s = stak;
    $(init);
});
