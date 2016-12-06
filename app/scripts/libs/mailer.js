/*jslint  white:false */
/*global define, window, Main */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 recreated drt 2016-01

 USE
 prepare obj/json for sending to php relay

 TODO
 document a bit

 */

define(['jquery'], function
    KLASS($) {
  'use strict'; // semi-static closure

//CLASS
  var Nom = 'Mailer',
      W = (W && W.window || window),
      C = (W.C || W.console || {});

  function Mailer(to, from, sub, msg, cc, pic) {
    this.to = to;
    this.from = from;
    this.sub = sub || 'Howdy';
    this.msg = msg || 'howdy there pardner...' + new Date();
    this.cc = cc || '';
    this.pic = pic || '';
    this.key = '***';
    this.relayFile = 'lib/relay2.php';

    this.getRelay = function () {
      return Main.relayServ + this.relayFile;
    };
    this.encodeObj = function () {
      var key, str = '';

      for (key in this) {
        var val = this[key];

        if (typeof val === 'function') {
          continue;
        }
        str += ('&' + key + '=');
        str += encodeURIComponent(val.replace(/[\t\ ]+/g, ' '));
      }
      return str.slice(1);
    };
    this.post = function (cb) {
      $.ajax({
        url: this.getRelay(),
        type: 'post',
        datatype: 'json',
        data: {
          to: this.to,
          sub: this.sub,
          from: this.from,
          cc: this.cc,
          msg: this.msg,
          pic: this.pic,
          key: this.key,
        },
        success: function () {
          if (W.debug > 1) {
            C.debug(Nom, 'success', arguments);
          }
          cb(); // close relay
        },
        error: function () {
          // probably done but origin access prohibited
          C.debug(Nom, 'forced post', arguments);
          cb();
        },
      });
    };
  }

  return Mailer;
});
/*



 */
