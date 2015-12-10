/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 recreated drt 2015-09

 USE
 manage basic quiz operations display/data/scoring

 TODO
 loosely load
 */

define(['jquery', 'lodash', 'quiz.data', 'meter', 'share'], function
    KLASS($, _, Data, Meter, Share) {
    'use strict';
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var Nom = 'Quiz';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    var Df = {
        delay: 222,
        limit: 2,
        random: false,
        sel: '.q-quiz',
        share: '.q-sharing',
    };

    function db(num) {
        return W.debug > (num || 0);
    }
    function ns(str) {
        return (str || '') + '.' + Nom;
    }

    function divDump(jq, arr) { // turn data into elements
        jq.empty(); // clear previous

        $.each(arr, function (i, e) {
            var div = $('<div>');

            div.html(e) //
                .data(Nom, {eq: i}) // indicate jq index
                .on(ns('click'), function () {
                    $.publish(ns('picked'), $(this).data()[Nom]);
                }).appendTo(jq.eq(i)); // distribute children
        });
    }
    // - - - - - - - - - - - - - - - - - -
    // EXTEND

    $.fn.revealOnly = function (ele) { // quiz.js extension
        $(this).children().hide();
        $(ele).show();
    };
    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    function Quiz(sel, cf) {
        cf = $.extend({}, Df, cf);
        sel = sel || cf.sel;

        var api, ele, index, list, rights, wrongs;

        ele = $(sel).first();
        ele = {
            main: ele,
            question: ele.find('.q-question td'), // ugg, tds for now
            choices: ele.find('.q-choices td'),
            answers: ele.find('.q-answers td'),
            intro: ele.find('.q-intro'),
            body: ele.find('.q-body'),
            mid: ele.find('.q-middle'),
            game: ele.find('.q-game'),
            result: ele.find('.q-result'),
            share: ele.find('.q-share'),
            sharing: ele.find('.q-sharing'),
            reset: ele.find('.q-reset'),
        };
        api = ele.main.data(Nom);
        index = -1;
        list = [];
        rights = [];
        wrongs = [];

//      PRIVATE
        function _bind() {
            if (cf.meter) {
                api.meter = new Meter(cf.meter);
                api.meter.bind(ns('dblclick'), function () {
                    showResult();
                });
            }
            ele.reset.on(ns('click'), function () {
                reset();
            });
            ele.share.on(ns('click'), function () {
                _shareResult();
            });
            $.subscribe(ns('picked'), function (_, data) {
                var opts, picked;

                opts = ele.choices.find('div').off(ns('click')); // disable choices
                picked = opts.eq(data.eq); // determine the choice picked
                opts.not(picked).fadeTo(999, 0.3); // ghost the rest
                _madeChoice(picked); // log choice

                W.setTimeout(function () {
                    showNext();
                }, cf.delay);
            });

            if (db(1)) {
                api[Nom + ':' + sel] = {
                    _closure: KLASS,
                    cf: cf,
                    ele: ele,
                    data: Data,
                };
                C.log(Nom + '<binding>', api);
            }
        }
        function _showIntro() {
            ele.intro.slideDown();
            ele.body.hide();
            ele.intro.find('button') // click to play
                .one(ns('click'), function () {
                    ele.intro.slideUp();
                    ele.body.fadeIn();
                });
        }
        function _madeChoice(answer) {
            answer.addClass('q-picked');

            if (answer.is('.q-correct')) {
                rights.push(answer);
            } else {
                wrongs.push(answer);
            }
        }
        function _reload() {
            list = cf.random ? _.shuffle(Data) : Data.concat(); // sample or dupe
            list = list.slice(0, cf.limit || 10); // 10 max? eh
            _showIntro();
        }
        function _calcPercent() {
            return index / list.length * 100; // percent completed
        }
        function _calcScore() {
            return rights.length / list.length * 100; // percent correct
        }
        function _setRank(num) {
            var rank;
            rank = Data.awards[Math.round(num / 10)];

            ele.body //
                .removeClass(Data.awards.join(' ')) // clear all ranks
                .addClass(rank);
            return rank;
        }
        function _shareResult() {
            var rank = showResult();

            if (api.share) {
                api.share.disarm(); // disarm share events + do callback
            }
            api.share = new Share(sel + ' ' + cf.share, {
                tokens: {// inside template
                    file_name: rank,
                    badge_name: rank,
                },
                callback: function () { // callback after share
                    showResult();
                },
            });
            ele.mid.revealOnly(ele.sharing);
        }

///     PUBLIC
        function fillWith(num) {
            num = num % list.length; // modulate index max

            var obj = list[num];

            divDump(ele.question, [obj.question]);
            divDump(ele.choices, obj.choices);
            divDump(ele.answers, obj.answers);

            ele.choices.find('div') //
                .eq(obj.target - 1) // the preferred answer
                .addClass('q-correct');
        }
        function showResult() {
            var rank = _setRank(_calcScore());
            ele.mid.revealOnly(ele.result);
            return rank;
        }
        function showNext() {
            index++;
            if (api.meter) {
                api.meter.set(_calcPercent());
            }
            if (index === list.length) {
                showResult();
            } else {
                fillWith(index);
            }
        }
        function reset() {
            rights = [];
            wrongs = [];
            index = -1;
            _setRank(0);
            _reload(); // fresh questions
            showNext(); // kick off with first
            ele.mid.revealOnly(ele.game);
        }

//      INIT
        if (!api) {
            api = $.extend(this, {
                meter: null,
                share: null,
                find: function (sel) {
                    return ele.main.find(sel);
                },
                fill: fillWith,
                next: showNext,
                reset: reset,
                result: showResult,
            });
            ele.main.data(Nom, api); // store api as data
        }
        _bind(); // instance
        api.reset();
        return api;
    }

    return Quiz;
});
/*



 */
