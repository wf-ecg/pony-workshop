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
        sliders: '#Slider1, #Slider2, #Slider3, #Slider4, #Slider5, #Slider6, #Slider7, #Slider8, #Slider9, #Slider10',
        sticker: '#Sticker img',
        title: '#Title',
      },
      bkgrStep = 9, //  needed for actions that happen when user arrives at this step or leaves step
      bkgrChoice = 'bgrd-01', // default image to use for background
      bkgrColors = [
        '#333333',
        '#84b3c5', '#95b73f', '#e5b523', '#268855', '#654d7d',
        '#267f9d', '#654d7d', '#fcce30', '#b47590', '#53a246',
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
  function showIntro(b) {
    //C.log('showIntro', b);
    if (b === false) {
      $(El.sliders).stop().animate({
        bottom: '300px',
        opacity: 0,
      }, 300);
      El.introSec.hide();
      El.buildSec.show().css('opacity', 1);
    } else {
      El.introSec.show();
      El.buildSec.hide();
    }
  }

  function setStep(num) {
    //C.log('setStep', num);
    if (!num) {
      return;
    }
    El.progSteps.removeClass('activate') //
        .eq(num).addClass('activate');

    $('#Slider' + (num - 1)).stop().animate({
      bottom: '300px',
      opacity: 0,
    }, 300);
    $('#Slider' + (num + 1)).stop().animate({
      bottom: '-300px',
      opacity: 0,
    }, 300);
    $('#Slider' + num).stop().animate({
      bottom: '0px',
      opacity: 1,
    }, 300);
  }

  function stepCheck() {
    if (!currentStep) {
      showIntro(true);
    } else if (currentStep < bkgrStep) { // moving backwards from backgrounds selection
      // clearBackground
      setBG('bgrd-clear');
      El.body.css('backgroundImage', 'url(images/pieces/bgrd-body.jpg)');
      El.fade.css('opacity', 0);
      El.preview.removeClass('previewScaled');
      El.sticker.hide();
    } else if (currentStep === bkgrStep) { // move to background step
      setBG(bkgrChoice);
      El.preview.addClass('previewScaled');
      El.sticker.show();
    } else if (currentStep > (bkgrStep + 1)) { // move to preview mode
      renderPreview();
    } else {
      removePreview(); // user has moved backwards from preview mode
    }
  }

  function gotoPrevStep() {
    // if user is going back from background selection screen
    // resize pony to regular size and remove background image and sticker
    if (currentStep > 0) {
      El.nextA.css('opacity', 1);
      setStep(--currentStep);

    } else { // reached the beginning
      El.prevA.css('opacity', 0.3);
    }
    stepCheck();
  }

  function gotoNextStep() {
    if (currentStep <= stepTotal) {
      showIntro(false);

      El.prevA.css('opacity', 0.3 + (0.7 * (currentStep > 0)));
      setStep(++currentStep);

    } else { // reached the end
      El.nextA.css('opacity', 0.3);
    }
    stepCheck();
  }

  function rollTo(num) {
    if (num < 0)
      num = 0;
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

  function randomPony() {
    function randoPad(limit) {
      var num = (Math.random() * limit);
      num = Math.floor(num + 1);
      num = (num < 10 ? '0' : '') + num;
      return num;
    }
    var rando = {
      a: randoPad(10),
      b: randoPad(9),
      c: randoPad(8),
      d: randoPad(4),
      e: randoPad(5),
    };
    $('#layer-body').attr('src', 'images/pieces/body-' + rando.a + '.png');
    $('#layer-ears').attr('src', 'images/pieces/ears-' + rando.a + '.png'); // ears match body
    $('#layer-mane').attr('src', 'images/pieces/mane-' + rando.b + '.png');
    $('#layer-nose').attr('src', 'images/pieces/nose-' + rando.c + '.png');
    $('#layer-sock').attr('src', 'images/pieces/sock-' + rando.d + '.png');
    $('#layer-foot').attr('src', 'images/pieces/foot-' + rando.e + '.png');
  }

  function setBG(str) {
    var num = Number(str.substr(str.length - 2)) || 0;

    str += (str === 'bgrd-clear') ? '.png' : '.jpg';
    El.preview.css({
      backgroundSize: 'contain',
      backgroundImage: 'url(images/pieces/' + str + ')',
    });
    El.fade.css({
      backgroundColor: bkgrColors[num] || 'black',
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

    El.prevA.on('click', function () {
      gotoPrevStep();
    });
    El.nextA.on('click', function () {
      gotoNextStep();
    });
    $('.js-build').on('click', function (evt) {
      evt.preventDefault();
      gotoNextStep();
    });
    $('div.step > div').on('click', function () {
      push(this.id);
    });

    $(El.sliders).slick({
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
