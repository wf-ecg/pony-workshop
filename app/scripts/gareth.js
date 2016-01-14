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

define(['jquery', 'slick'], function ($) {
    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        Nom = 'Gar',
        El = {
            body: 'body',
            buildSec: '#Build',
            cta: '#cta',
            fade: '#BackgroundFaded',
            footer: 'footer',
            header: 'header',
            introSec: '#Intro',
            nextA: '.js-next.step',
            prevA: '.js-prev.step',
            preview: '#PreviewPony',
            progBar: '#ProgressBar',
            progSteps: '#ProgressBar div',
            selector: '#outerSelector',
            sticker: '#layer-stkr',
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
            currentStep--;
            if (currentStep > bkgrStep) { // user has moved backwards from preview mode
                removePreview();
            }
            El.progSteps.eq(currentStep + 1).removeClass('grow2');
            El.progSteps.eq(currentStep).addClass('grow2');

            $('#Step' + (currentStep + 1)).animate({
                opacity: -1,
                bottom: '-300px'
            }, 300);
            $('#Step' + currentStep).animate({
                opacity: 1,
                bottom: '0px'
            }, 300);
        }
        if (currentStep === 1) { //reached the beginning
            El.prevA.css('opacity', 0.3);
        }
        if (currentStep === (bkgrStep - 1)) {
            //El.preview[0].classList.remove('previewScaled');
        }
    }

    function gotoNextStep() {
        if (currentStep <= stepTotal) {
            El.prevA.css('opacity', 0.3 + (0.7 * (currentStep > 0)));
            currentStep++;

            if (currentStep === bkgrStep) { // move to background step
                setBG(bkgrChoice);
                El.preview.addClass('previewScaled');
                El.sticker.show();
            }
            if (currentStep === (bkgrStep + 2)) { // move to preview mode
                renderPreview();
            }

            El.progSteps.eq(currentStep - 1).removeClass('grow2');
            El.progSteps.eq(currentStep).addClass('grow2');

            $('#Step' + (currentStep - 1)).animate({
                bottom: '300px',
                opacity: -1,
            }, 300);

            $('#Step' + currentStep).animate({
                bottom: '0px',
                opacity: 1,
            }, 300);
        }
        if (currentStep === stepTotal) { //reached the end
            El.nextA.css('opacity', 0.3);
        }
    }

    function push(id) {
        var imageURL = $('#' + id + ' img')[0].src;
        //extract string following images/thumbs but without file type
        var imageFile = (imageURL.substring(imageURL.length - 11, imageURL.length - 4));
        var itemType = imageFile.substring(0, 4); //extract item type from file name

        if (itemType === 'bgrd') {
            bkgrChoice = imageFile;
            setBG(imageFile);
        } else if (itemType !== null) {
            $('#layer-' + itemType)[0].src = 'images/pieces/' + imageFile + '.png';
        }
        if (itemType === 'body') {
            itemType = 'ears';
            imageFile = imageFile.replace('body', 'ears');
            $('#layer-' + itemType)[0].src = 'images/pieces/' + imageFile + '.png';
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
        El.cta.addClass('grow2');
        El.footer.addClass('pushDown').removeClass('pushDownUndo');
        El.header.addClass('pushUp').removeClass('pushUpUndo');
        El.progBar.removeClass('pushLeftUndo').addClass('pushLeft');
        El.selector.addClass('pushDown').removeClass('pushDownUndo');
        El.title.addClass('pushUp').removeClass('pushUpUndo');
        //El.preview.addClass('previewScaled100pc');
    }

    function removePreview() {
        //leave preview mode, returning elements to normal positions
        El.cta.removeClass('grow2');
        El.footer.addClass('pushDownUndo').removeClass('pushDown');
        El.header.addClass('pushUpUndo').removeClass('pushUp');
        El.progBar.addClass('pushLeftUndo').removeClass('pushLeft');
        El.selector.addClass('pushDownUndo').removeClass('pushDown');
        El.title.addClass('pushUpUndo').removeClass('pushUp');
        //El.preview.removeClass('previewScaled100pc');
    }

    function init() {
        $.reify(El);

        randomPony();
        gotoNextStep();

        El.prevA.click(function () {
            gotoPrevStep();
        });
        El.nextA.click(function () {
            gotoNextStep();
        });
        $('#btnBuild').click(function () {
            El.introSec.hide();
            El.buildSec.css('opacity', 1);
        });
        $('div.step > div').click(function () {
            push(this.id);
        });

        $('#Step1, #Step2, #Step3, #Step4, #Step5, #Step6, #Step7, #Step8, #Step9, #Step10').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 3,
            responsive: [
                {
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
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }
    // - - - - - - - - - - - - - - - - - -
    // EXPOSE

    W[Nom] = {
        El: El,
    };

    $(init);

});
