/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 construct html email message
 hook up buttons and fields

 TODO
 document a bit
 loosely load
 */

define(['jquery', 'mailer'], function
    KLASS($, Mail) {
    'use strict';

    var Nom = "Share";
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Df = {
        callback: '',
        invalid: 'Please check addresses for validity',
        sel: '.sharing',
        subject: 'Subject',
        template: 'email.html .body',
        test: 'david.turgeon@wellsfargo.com',
        tokens: '',
    };
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }
    var K = {
        isGoodEmail: function (str) {
            if (!str || !str.match('wellsfargo')) {
                return false;
            }
            return !!str.match(/^.{3,}@.{2,}\..{2,4}$/); //  simplistic check
        },
        checkEmail: function (ele) {
            ele = $(ele.originalEvent ? ele.target : ele);
            if (db(1)) {
                ele.val(Df.test);
            }
            var str = $(ele).val();

            if (K.isGoodEmail(str)) {
                ele.removeClass('bad');
                return str;
            }
            ele.addClass('bad');
        },
        makeMessage: function (src, dat) {
            if (src.has('.wipe')) { // needed?
                src.find('.wipe').remove();
            }
            var html = $(src).html();

            $.each(dat, function (i, e) {
                var reg = new RegExp('{{\\s*' + i + '\\s*}}', 'g');
                html = html.replace(reg, e);
            });

            return html.replace(/[\t\ ]+/g, ' ');
        },
    };
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Share(sel, cf) { // take a mailto element, {tokens, callback}
        cf = $.extend({}, Df, cf);
        sel = sel || cf.sel;

        var api, ele;

        ele = $(sel).first();
        ele = {
            main: ele,
            head: ele.find('.heading'),
            mess: ele.find('.message'),
            pict: ele.find('.picture'),
            mail: ele.find('.mailto'),
            stop: ele.find('.cancel'),
            theirs: ele.find('.theirs, .to'),
            yours: ele.find('.yours, .from'),
        };
        api = ele.main.data(Nom); // possibly restore data

//      PRIVATE
        function _bind() {
            ele.mail.on(ns('click'), function () {
                if (_checkEmails()) {
                    _sendMail();
                } else {
                    alert(cf.invalid);
                }
            });
            ele.stop.on(ns('click'), destroy);
            ele.yours.on(ns('blur'), K.checkEmail);
            ele.theirs.on(ns('blur'), K.checkEmail);
            reset();

            if (db()) {
                api[Nom + ':' + sel] = {
                    _closure: KLASS,
                    cf: cf,
                    ele: ele,
                };
                C.log(Nom + '<binding>', api);
            }
        }
        function _unbind() {
            $(ele.main.find('*')).off(ns());
        }
        function _checkEmails() {

            // CUSTOM
            var head, mess, pict;

            head = ele.head.val();
            mess = ele.mess.val();
            pict = ele.pict.val();

            if (head && head !== '(optional)') {
                cf.tokens.heading = head;
            }
            if (mess && mess !== '(optional)') {
                cf.tokens.message = mess;
            }
            if (!head && !mess) {
                // TODO hide row
            }
            // END

            return (K.checkEmail(ele.yours) && K.checkEmail(ele.theirs) && true);
        }
        function _makeMailFrom(src) { // make ready-to-post object
            var obj = {
                to: K.checkEmail(ele.theirs),
                from: K.checkEmail(ele.yours),
                sub: cf.subject,
                msg: K.makeMessage(src, cf.tokens), // user a source element for html
                pic: cf.picture,
            };
            obj.cc = obj.from;
            // to, from, sub, msg, cc
            return new Mail(obj.to, obj.from, obj.sub, obj.msg, obj.cc, obj.pic);
        }
        function _sendMail() {
            var mail, mele = $('<div>').appendTo('body');

            mele.load(cf.template, function () {
                mail = _makeMailFrom(mele);

                mail['post'](function () {
                    if (db(2)) {
                        C.log(Nom, mail);
                        $('body').html(mail.msg);
                    } else {
                        W.alert('Sent!');
                        mele.remove();
                        destroy();
                        reset();
                    }
                });
            });
        }

//      PUBLIC
        function destroy() {
            _unbind();
            if (typeof cf.callback === 'function') {
                cf.callback();
            }
        }
        function reset() {
            ele.theirs.removeClass('bad').val(''); // only clear their email
            ele.yours.removeClass('bad');
        }

//      INIT
        if (!api) {
            api = $.extend(this, api, {
                disarm: destroy,
                reset: reset,
            });
            ele.main.data(Nom, api); // store api as data
        }
        _bind(); // instance
        return api;
    }

    return Share;
});
/*



 */
