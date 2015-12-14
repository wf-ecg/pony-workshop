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

    function makeStream(can) {
        var str = can.toDataURL();
        return str.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }
    function linkDownloadName(ele, can, nom) {
        ele.download = nom + '.png';
        ele.href = makeStream(can);
    }

    var stak = new Stack();
    var ele = $('.preview div img');
    var lnk = $('#download');
    var can = $('#can').css({
        zIndex: 111,
        position: 'relative',
    }).hide();

    function doit() {
        stak.setOrigin(444, 111);
        ele.each(function (i, e) {
            stak.addLayer(e);
        });
        stak.drawOn(can[0]);
        linkDownloadName(lnk[0], can[0], 'ponypic');
    }

    lnk.on('click', doit);

    W.s = stak;
});
