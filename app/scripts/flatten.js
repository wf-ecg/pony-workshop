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
        var str = can.toDataURL('image/jpeg', 0.75);

        str = str.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        return str;
    }
    function linkDownloadName(ele, can, nom) {
        ele.download = nom + '.jpg';
        ele.href = makeStream(can);
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
            stak.drawOn(can[0]);
            linkDownloadName(lnk[0], can[0], 'ponypic');
        });
    }

    function doit(evt) {
        addBkgr(stak);

        stak.setOrigin(444, 111);
        ele.find('div img') // .not(stkr) //
            .each(function (i, e) {
                stak.addLayer(e);
            });
    }

    lnk.on('mouseover', doit);

    W.s = stak;
});
