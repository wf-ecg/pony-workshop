/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 recreated drt 2016-01 (glp 2015-11)

 USE
 wrapper for loose functions

 TODO
 break up
 */

define(['jquery', 'slick'], function ($) {
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        Nom = 'Gar',
        El = {
            body: 'body',
            buildSec: '#Build',
            cta: '.ctaContainerOuter',
            fade: '#BackgroundFaded',
            footer: 'footer',
            header: 'header',
            introSec: '#Intro',
            nextA: '.js-next.step',
            prevA: '.js-prev.step',
            preview: '#PreviewPony',
            progBar: '#ProgressBar',
            progSteps: '#ProgressBar div',
            selector: '.outerSelector:first',
            sticker: '#Sticker img',
            title: '#Title',
        },
        bkgrStep = 9, //  needed for actions that happen when user arrives at this step or leaves step
        bkgrChoice = 'bgrd-01', // default image to use for background
        bkgrColors = [
            '#ffffff', '#84b3c5', '#95b73f',
            '#e5b523', '#268855', '#654d7d',
            '#267f9d', '#654d7d', '#fcce30',
        ],
        currentStep = 0,
        stepName = ['Intro',
            '1. Select Pony',
            '2. Choose Saddle',
            '3. Choose Back',
            '4. Choose Head',
            '5. Choose Mane',
            '6. Choose Nose',
            '7. Choose Feet',
            '8. Choose Socks',
            '9. Pick a Background',
            'Download/Share'],
        stepTotal = stepName.length,
        U;
    // - - - - - - - - - - - - - - - - - -
    // ETC

    function setStep(num) {
        //C.log('setStep', num);
        num = num || 1;

        El.progSteps.removeClass('activate') //
            .eq(num).addClass('activate');

        $('#Step' + (num - 1)).stop().animate({
            bottom: '300px',
            opacity: -1,
        }, 300);
        $('#Step' + (num + 1)).stop().animate({
            bottom: '-300px',
            opacity: -1,
        }, 300);
        $('#Step' + num).stop().animate({
            bottom: '0px',
            opacity: 1,
        }, 300);
    }

    function gotoPrevStep() {
        // if user is going back from background selection screen
        // resize pony to regular size and remove background image and sticker
        if (currentStep > 1) {
            El.nextA.css('opacity', 1);

            if (currentStep === bkgrStep) { // moving backwards from backgrounds selection
                setBG('bgrd-clear');
                El.body.css('backgroundImage', 'url(images/backgrounds/bgrd-body.jpg)');
                El.fade.css('opacity', 0);
                El.preview.removeClass('previewScaled');
                El.sticker.hide();
            }
            setStep(--currentStep);

            if (currentStep > bkgrStep) { // user has moved backwards from preview mode
                removePreview();
            }

        } else { // reached the beginning
            El.prevA.css('opacity', 0.3);
        }
    }

    function gotoNextStep() {
        if (currentStep <= stepTotal) {
            El.prevA.css('opacity', 0.3 + (0.7 * (currentStep > 0)));

            setStep(++currentStep);

            if (currentStep === bkgrStep) { // move to background step
                setBG(bkgrChoice);
                El.preview.addClass('previewScaled');
                El.sticker.show();
            }
            if (currentStep === (bkgrStep + 2)) { // move to preview mode
                renderPreview();
            }

        } else { // reached the end
            El.nextA.css('opacity', 0.3);
        }
    }

    function rollTo(num) {
        if (num < 1)
            num = 1;
        if (num > stepTotal)
            num = stepTotal;
        while (num > currentStep)
            gotoNextStep();
        while (num < currentStep)
            gotoPrevStep();
    }

    function push(id) {
        var imageURL = $('#' + id + ' img').attr('src');
        //extract string following images/thumbs but without file type
        var imageFile = (imageURL.substring(imageURL.length - 11, imageURL.length - 4));
        var itemType = imageFile.substring(0, 4); //extract item type from file name

        if (itemType === 'bgrd') {
            bkgrChoice = imageFile;
            setBG(imageFile);
        } else if (itemType !== null) {
            $('#layer-' + itemType).attr('src', 'images/pieces/' + imageFile + '.png');
        }
        if (itemType === 'body') {
            itemType = 'ears';
            imageFile = imageFile.replace('body', 'ears');
            $('#layer-' + itemType).attr('src', 'images/pieces/' + imageFile + '.png');
        }
    }

    function randoPad(limit) {
        var num = (Math.random() * limit);

        num = Math.floor(num + 1);
        num = (num < 10 ? '0' : '') + num;

        return num;
    }

    function randomPony() {
        var randomBody = randoPad(10);
        var randomMane = randoPad(9);
        var randomNose = randoPad(8);
        var randomSock = randoPad(4);
        var randomFeet = randoPad(5);

        $('#layer-body').attr('src', 'images/pieces/body-' + randomBody + '.png');
        $('#layer-ears').attr('src', 'images/pieces/ears-' + randomBody + '.png'); // ears match body
        $('#layer-mane').attr('src', 'images/pieces/mane-' + randomMane + '.png');
        $('#layer-nose').attr('src', 'images/pieces/nose-' + randomNose + '.png');
        $('#layer-sock').attr('src', 'images/pieces/sock-' + randomSock + '.png');
        $('#layer-foot').attr('src', 'images/pieces/foot-' + randomFeet + '.png');
    }

    function setBG(str) {
        var num = Number(str.substr(str.length - 1));

        str += (str === 'bgrd-clear') ? '.png' : '.jpg';
        El.preview.css({
            backgroundSize: 'contain',
            backgroundImage: 'url(images/backgrounds/' + str + ')',
        });
        El.fade.css({
            backgroundColor: bkgrColors[num] || 'white',
            opacity: 1,
        });
    }

    function renderPreview() {
        //after sticker step, render preview and bring in download/email buttons
        El.cta.addClass('activate');
        El.footer.addClass('pushDown').removeClass('pushDownUndo');
        El.header.addClass('pushUp').removeClass('pushUpUndo');
        El.progBar.removeClass('pushLeftUndo').addClass('pushLeft');
        El.selector.addClass('pushDown').removeClass('pushDownUndo');
        El.title.addClass('pushUp').removeClass('pushUpUndo');
        El.preview.addClass('previewScaled100pc');
    }

    function removePreview() {
        //leave preview mode, returning elements to normal positions
        El.cta.removeClass('activate');
        El.footer.addClass('pushDownUndo').removeClass('pushDown');
        El.header.addClass('pushUpUndo').removeClass('pushUp');
        El.progBar.addClass('pushLeftUndo').removeClass('pushLeft');
        El.selector.addClass('pushDownUndo').removeClass('pushDown');
        El.title.addClass('pushUpUndo').removeClass('pushUp');
        El.preview.removeClass('previewScaled100pc');
    }

    function init() {
        $.reify(El);

        randomPony();
        gotoNextStep();

        El.prevA.on('click', function () {
            gotoPrevStep();
        });
        El.nextA.on('click', function () {
            gotoNextStep();
        });
        $('.js-build').on('click', function (evt) {
            evt.preventDefault();
            El.introSec.hide();
            El.buildSec.css('opacity', 1);
        });
        $('div.step > div').on('click', function () {
            push(this.id);
        });

        $('#Step1, #Step2, #Step3, #Step4, #Step5, #Step6, #Step7, #Step8, #Step9, #Step10').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 5,
            responsive: [{
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 4,
                    }
                }, {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                    }
                }, {
                    breakpoint: 1010,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                    }
                }, {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                    }
                }, {
                    breakpoint: 479,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                }], // unslick at a given breakpoint w/ settings: "unslick"

        });
    }
    // - - - - - - - - - - - - - - - - - -
    // EXPOSE

    $(init);

    W[Nom] = {
        El: El,
        set: setStep,
        next: gotoNextStep,
        prev: gotoPrevStep,
        roll: rollTo,
    };

    return W[Nom];
});
