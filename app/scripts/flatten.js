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

        str = str.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        return str;
    }
    function linkDownloadName(ele, can, nom) {
        ele[0].download = nom + '.jpg';
        ele.attr('href', makeStream(can));
    }
    function addBkgr(stak) {
        var src = ele.css('background-image');
        var img = $('<img>').appendTo('body');

        src = src.match(/(http:.+jpg)/g)[0];
        img.attr('src', src);
        C.warn(src, img);
        img.on('load', function () {
            C.warn(img, src);
            stak.insertLayer(img[0], 1, 0, 0);
            stak.addLayer(stkr[0], 0, 0);

            stak.drawOn(can[0]);
            linkDownloadName(lnk, can[0], 'ponypic');

            if (!lnk.attr('download') && !lnk.next().is('.dl-note')) {
                $('<div>').addClass('dl-note') //
                    .text('Right-click to download and save.') //
                    .insertAfter(lnk);
            }
        });
    }

    function doit(evt) {
        C.warn('doin it');
        addBkgr(stak);

        stak.setOrigin(444, 111);
        ele.find('div img').not(stkr) //
            .each(function (i, e) {
                stak.addLayer(e);
            });
    }

    function init() {
        ele = $(ele);
        lnk = $(lnk).on('mouseover', doit);
        can = $(can).css({
            zIndex: 0,
            position: 'absolute',
        });
        stkr = $(stkr);
    }

    W.s = stak;
    $(init);
});
