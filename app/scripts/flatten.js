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
    var ele = $('#previewPony');
    var lnk = $('#download');
    var can = $('#can').css({
        zIndex: 111,
        position: 'relative',
    }).hide();

    var stkr = $('#stickerDiv img');

    function makeStream(can) {
        var str = can.toDataURL();
        str = str.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        return str;
    }
    function linkDownloadName(ele, can, nom) {
        ele.download = nom + '.png';
        ele.href = makeStream(can);
    }
    function addBkgr(stak) {
        var bkgr = ele.css('background-image').match(/([^"]+)/g)[1];
        var img = $('<img>').attr('src', bkgr).appendTo('body');
        img.on('load', function () {
            C.warn(img, bkgr);
            stak.insertLayer(img[0], 0, 0, 0);
            stak.drawOn(can[0]);
            linkDownloadName(lnk[0], can[0], 'ponypic');
        });
    }
    function addStkr(stak) {
        var o = {};
        o.frac = ele.width() / 1920;
        o.p1 = stkr.offset();
        o.p2 = stkr.offsetParent().offset();
        o.pl = (o.p1.left - o.p2.left) / o.frac | 0;
        o.pt = (o.p1.top - o.p2.top) / o.frac | 0;
        C.warn(o);
        stak.setOrigin(o.pl, o.pt);
        stak.addLayer(stkr[0]);
    }

    function doit(evt) {
        evt.preventDefault();
        addBkgr(stak);

        stak.setOrigin(444, 111);
        ele.find('div img') // .not(stkr) //
            .each(function (i, e) {
                stak.addLayer(e);
            });
        //addStkr(stak);
    }

    lnk.one('click', doit);

    W.s = stak;
});
