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
    var W = window,
        stepName = ['Intro', '1. Select Pony', '2. Choose Saddle', '3. Choose Back', '4. Choose Head', '5. Choose Mane', '6. Choose Nose', '7. Choose Feet', '8. Choose Socks', '9. Pick a Background', 'Download/Share'],
        currentStep = 0,
        totalSteps = stepName.length,
        backgroundStep = 9, //  needed for actions that happen when user arrives at this step or leaves step
        bgChoice = 'bgrd-01'; // default image to use for background

    W.push = push;

    function gotoBuild() {
        $('#sectionIntro').hide();
        $('#sectionBuild').css('opacity', 1);
    }

    function gotoPrevStep() {
        //check if user is going back from background selection screen -- if so, resize pony to regular size and remove background image and sticker
        if (currentStep > 1) {
            $('#nextArrow').css('opacity', 1);
            if (currentStep === backgroundStep) {
                // user is moving backwards from backgrounds selection
                $('#previewPony').removeClass('previewScaled');
                setBG('bgrd-clear');
                $('#layer-stkr').hide();
                document.body.style.backgroundImage = 'url(images/backgrounds/bgrd-body.jpg)';
                $('#backgroundFaded').css('opacity', 0);
            }
            currentStep--;
            if (currentStep > backgroundStep) {
                //user has moved backwards from preview mode to sticker selection
                removePreview();
            }
            $('#progressBar div').eq(currentStep + 1).removeClass('grow2');
            $('#progressBar div').eq(currentStep).addClass('grow2');

            $('#step' + (currentStep + 1)).animate({
                opacity: -1,
                bottom: '-300px'
            }, 300);

            $('#step' + currentStep).animate({
                opacity: 1,
                bottom: '0px'
            }, 300);
        }
        if (currentStep === 1) {
            //reached the beginning
            $('#previousArrow')[0].style.opacity = 0.3;
        }

        if (currentStep === (backgroundStep - 1)) {
            //$('#previewPony')[0].classList.remove('previewScaled');
        }
    }

    function gotoNextStep() {
        if (currentStep <= totalSteps) {
            $('#previousArrow')[0].style.opacity = 0.3 + (0.7 * (currentStep > 0));
            currentStep++;
            if (currentStep === backgroundStep) {
                //perform any actions on move to background step
                $('#previewPony').addClass('previewScaled');
                setBG(bgChoice);
                $('#layer-stkr').show();
                //$('#progressBar').classList.add('progressBackground');
            }

            if (currentStep === (backgroundStep + 1)) {
                //perform any actions on move to sticker step
            }

            if (currentStep === (backgroundStep + 2)) {
                //perform any actions on move to preview mode
                renderPreview();
            }

            //$('#stepName').innerHTML = stepName[currentStep];
            $('#progressBar div').eq(currentStep - 1).removeClass('grow2');
            $('#progressBar div').eq(currentStep).addClass('grow2');

            $('#step' + (currentStep - 1)).animate({
                opacity: -1,
                bottom: '300px'
            }, 300);

            $('#step' + currentStep).animate({
                opacity: 1,
                bottom: '0px'
            }, 300);
        }
        if (currentStep === totalSteps) {
            //reached the end
            $('#nextArrow').css('opacity', 0.3);

        }
    }

    function push(id) {
        var imageURL = $('#' + id + ' img')[0].src;
        var imageFile = (imageURL.substring(imageURL.length - 11, imageURL.length - 4)); //extract string following images/thumbs but without file type
        var itemType = imageFile.substring(0, 4); //extract four-character item type from file name

        if (itemType === 'bgrd') {
            bgChoice = imageFile;
            setBG(imageFile); //run setBG function
        } else if (itemType !== null) {
            $('#layer-' + itemType)[0].src = 'images/pieces/' + imageFile + '.png';
        }
        if (itemType === 'body') {
            itemType = 'ears';
            imageFile = imageFile.replace('body', 'ears');
            $('#layer-' + itemType)[0].src = 'images/pieces/' + imageFile + '.png';
        }

        if (itemType === 'stkr') {
            //set custom positioning of sticker
            var stickerNumber = Number(imageFile.substr(imageFile.length - 1));
            var ele = $('#layer-stkr').hide();

            ele.removeClass('sticker1 sticker2 sticker3 sticker4');
            switch (stickerNumber) {
                case 1:
                    ele.addClass('sticker1');
                    break;
                case 2:
                    ele.addClass('sticker2');
                    break;
                case 3:
                    ele.addClass('sticker3');
                    break;
                case 4:
                    ele.addClass('sticker4');
                    break;
                default:
                    ele.addClass('sticker0');
            }
            $('#layer-stkr').show();
        }

    }

    function randomPony() {
        var randomEars = Math.floor((Math.random() * 10) + 1);
        $('#layer-ears')[0].src = 'images/pieces/ears-' + pad2(randomEars) + '.png';
        var randomBody = Math.floor((Math.random() * 10) + 1);
        $('#layer-body')[0].src = 'images/pieces/body-' + pad2(randomBody) + '.png';
        var randomMane = Math.floor((Math.random() * 9) + 1);
        $('#layer-mane')[0].src = 'images/pieces/mane-' + pad2(randomMane) + '.png';
        var randomNose = Math.floor((Math.random() * 8) + 1);
        $('#layer-nose')[0].src = 'images/pieces/nose-' + pad2(randomNose) + '.png';
        var randomSock = Math.floor((Math.random() * 4) + 1);
        $('#layer-sock')[0].src = 'images/pieces/sock-' + pad2(randomSock) + '.png';
        var randomFeet = Math.floor((Math.random() * 5) + 1);
        $('#layer-foot')[0].src = 'images/pieces/foot-' + pad2(randomFeet) + '.png';
    }

    function pad2(number) {
        return (number < 10 ? '0' : '') + number;
    }

    function setBG(bgChoice) {
        var imageNumber = Number(bgChoice.substr(bgChoice.length - 1));

        bgChoice += (bgChoice === 'bgrd-clear') ? '.png' : '.jpg';
        $('#previewPony').css('backgroundImage', 'url(images/backgrounds/' + bgChoice + ')');
        $('#previewPony').css('backgroundSize', 'contain');
        $('#backgroundFaded').css('opacity', 1);
        switch (imageNumber) {
            case 1:
                $('#backgroundFaded').css('backgroundColor', '#84b3c5');
                break;
            case 2:
                $('#backgroundFaded').css('backgroundColor', '#95b73f');
                break;
            case 3:
                $('#backgroundFaded').css('backgroundColor', '#e5b523');
                break;
            case 4:
                $('#backgroundFaded').css('backgroundColor', '#268855');
                break;
            case 5:
                $('#backgroundFaded').css('backgroundColor', '#654d7d');
                break;
            case 6:
                $('#backgroundFaded').css('backgroundColor', '#267f9d');
                break;
            case 7:
                $('#backgroundFaded').css('backgroundColor', '#654d7d');
                break;
            case 8:
                $('#backgroundFaded').css('backgroundColor', '#fcce30');
                break;
            default:
                $('#backgroundFaded').css('backgroundColor', '#ffffff');
        }

    }

    function renderPreview() {
        //after sticker step, render preview and bring in download/email buttons
        $('footer').addClass('pushDown').removeClass('pushDownUndo');
        $('header').addClass('pushUp').removeClass('pushUpUndo');
        $('#outerSelector').addClass('pushDown').removeClass('pushDownUndo');
        $('#progressBar').removeClass('pushLeftUndo').addClass('pushLeft');
        $('#title').addClass('pushUp').removeClass('pushUpUndo');

        //$('#previewPony').addClass('previewScaled100pc');
        $('#cta').addClass('grow2');
    }

    function removePreview() {
        //leave preview mode, returning elements to normal positions
        $('footer').addClass('pushDownUndo').removeClass('pushDown');
        $('header').addClass('pushUpUndo').removeClass('pushUp');
        $('#outerSelector').addClass('pushDownUndo').removeClass('pushDown');
        $('#progressBar').addClass('pushLeftUndo').removeClass('pushLeft');
        $('#title').addClass('pushUpUndo').removeClass('pushUp');

        //$('#previewPony').removeClass('previewScaled100pc');
        $('#cta').removeClass('grow2');
    }

    function init() {
        randomPony();
        gotoNextStep();

        $('#previousArrow').click(function () {
            gotoPrevStep();
        });
        $('#previousArrowPreview').click(function () {
            gotoPrevStep();
        });

        $('#nextArrow').click(function () {
            gotoNextStep();
        });
        $('#btnBuild').click(function () {
            gotoBuild();
        });

        $('#step1, #step2, #step3, #step4, #step5, #step6, #step7, #step8, #step9, #step10').slick({
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
                        infinite: false,
                        dots: false
                    }
                }, {
                    breakpoint: 1010,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: false,
                        dots: false
                    }
                }, {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        infinite: false,
                        dots: false
                    }
                }, {
                    breakpoint: 479,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

    $(init);

});
