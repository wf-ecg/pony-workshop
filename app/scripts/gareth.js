$(document).ready(function () {
    stepName = ['Intro', '1. Select Pony', '2. Choose Saddle', '3. Choose Back', '4. Choose Head', '5. Choose Mane', '6. Choose Nose', '7. Choose Feet', '8. Choose Socks', '9. Pick a Background', 'Download/Share'];
    currentStep = 0;
    totalSteps = stepName.length;
    backgroundStep = 9; //needed for actions that happen when user arrives at this step or leaves step
    bgChoice = 'bgrd-01'; // default image to use for background
    randomPony();
    gotoNextStep();


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
            },
            {
                breakpoint: 1010,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false
                }
            },
            {
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

});

function gotoBuild() {
    document.getElementById('sectionIntro').style.display = 'none';
    document.getElementById('sectionBuild').style.opacity = '1';
}

function gotoPrevStep() {
    //check if user is going back from background selection screen -- if so, resize pony to regular size and remove background image and sticker
    if (currentStep > 1) {
        document.getElementById('nextArrow').style.opacity = 1;
        if (currentStep === backgroundStep) {
            // user is moving backwards from backgrounds selection
            document.getElementById('previewPony').classList.remove('previewScaled');
            setBG('bgrd-clear');
            document.getElementById('layer-stkr').style.display = 'none';
            document.body.style.backgroundImage = 'url(images/backgrounds/bgrd-body.jpg)';
            document.getElementById('backgroundFaded').style.opacity = '0';
        }
        currentStep--;
        if (currentStep > backgroundStep) {
            //user has moved backwards from preview mode to sticker selection
            removePreview();
        }
        document.getElementById('progressBar').getElementsByTagName('div')[currentStep + 1].classList.remove('grow2');
        document.getElementById('progressBar').getElementsByTagName('div')[currentStep].classList.add('grow2');

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
        document.getElementById('previousArrow').style.opacity = 0.3;
    }

    if (currentStep === (backgroundStep - 1)) {
        //document.getElementById('previewPony').classList.remove('previewScaled');
    }
}

function gotoNextStep() {
    if (currentStep <= totalSteps) {
        document.getElementById('previousArrow').style.opacity = 0.3 + (0.7 * (currentStep > 0));
        currentStep++;
        if (currentStep === backgroundStep) {
            //perform any actions on move to background step
            document.getElementById('previewPony').classList.add('previewScaled');
            setBG(bgChoice);
            document.getElementById('layer-stkr').style.display = 'block';
            //document.getElementById('progressBar').classList.add('progressBackground');
        }

        if (currentStep === (backgroundStep + 1)) {
            //perform any actions on move to sticker step
        }

        if (currentStep === (backgroundStep + 2)) {
            //perform any actions on move to preview mode
            renderPreview();
        }

        //document.getElementById('stepName').innerHTML = stepName[currentStep];
        document.getElementById('progressBar').getElementsByTagName('div')[currentStep - 1].classList.remove('grow2');
        document.getElementById('progressBar').getElementsByTagName('div')[currentStep].classList.add('grow2');

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
        document.getElementById('nextArrow').style.opacity = 0.3;

    }
}

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

function push(id) {
    var imageURL = document.getElementById(id).getElementsByTagName('img')[0].src;
    imageFile = (imageURL.substring(imageURL.length - 11, imageURL.length - 4)); //extract string following images/thumbs but without file type
    var itemType = imageFile.substring(0, 4); //extract four-character item type from file name
    if (itemType === 'bgrd') {
        bgChoice = imageFile;
        setBG(imageFile); //run setBG function
    } else if (itemType !== null) {
        document.getElementById('layer-' + itemType).src = 'images/pieces/' + imageFile + '.png';
    }
    if (itemType === 'stkr') {
        //set custom positioning of sticker
        var stickerNumber = Number(imageFile.substr(imageFile.length - 1));
        document.getElementById('layer-stkr').style.display = 'none';
        document.getElementById('layer-stkr').classList.remove('sticker1', 'sticker2', 'sticker3', 'sticker4');
        switch (stickerNumber) {
            case 1:
                document.getElementById('layer-stkr').classList.add('sticker1');
                break;
            case 2:
                document.getElementById('layer-stkr').classList.add('sticker2');
                break;
            case 3:
                document.getElementById('layer-stkr').classList.add('sticker3');
                break;
            case 4:
                document.getElementById('layer-stkr').classList.add('sticker4');
                break;
            default:
                document.getElementById('layer-stkr').classList.add('sticker0');
                break;
        }
        document.getElementById('layer-stkr').style.display = 'block';
    }

}

function randomPony() {
    var randomBody = Math.floor((Math.random() * 10) + 1);
    document.getElementById('layer-body').src = 'images/pieces/body-' + pad2(randomBody) + '.png';
    var randomMane = Math.floor((Math.random() * 9) + 1);
    document.getElementById('layer-mane').src = 'images/pieces/mane-' + pad2(randomMane) + '.png';
    var randomNose = Math.floor((Math.random() * 8) + 1);
    document.getElementById('layer-nose').src = 'images/pieces/nose-' + pad2(randomNose) + '.png';
    var randomSock = Math.floor((Math.random() * 4) + 1);
    document.getElementById('layer-sock').src = 'images/pieces/sock-' + pad2(randomSock) + '.png';
    var randomFeet = Math.floor((Math.random() * 6) + 1);
    document.getElementById('layer-foot').src = 'images/pieces/foot-' + pad2(randomFeet) + '.png';
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number;
}

function setBG(bgChoice) {
    var imageNumber = Number(bgChoice.substr(bgChoice.length - 1));
    document.getElementById('previewPony').style.backgroundImage = 'url(images/backgrounds/' + bgChoice + '.jpg)';
    document.getElementById('previewPony').style.backgroundSize = 'contain';
    document.getElementById('backgroundFaded').style.opacity = '1';
    switch (imageNumber) {
        case 1:
            document.getElementById('backgroundFaded').style.backgroundColor = '#84b3c5';
            break;
        case 2:
            document.getElementById('backgroundFaded').style.backgroundColor = '#95b73f';
            break;
        case 3:
            document.getElementById('backgroundFaded').style.backgroundColor = '#e5b523';
            break;
        case 4:
            document.getElementById('backgroundFaded').style.backgroundColor = '#268855';
            break;
        case 5:
            document.getElementById('backgroundFaded').style.backgroundColor = '#654d7d';
            break;
        case 6:
            document.getElementById('backgroundFaded').style.backgroundColor = '#267f9d';
            break;
        case 7:
            document.getElementById('backgroundFaded').style.backgroundColor = '#654d7d';
            break;
        case 8:
            document.getElementById('backgroundFaded').style.backgroundColor = '#fcce30';
            break;
        default:
            document.getElementById('backgroundFaded').style.backgroundColor = '#ffffff';
            break;
    }

}

function renderPreview() {
    //after sticker step, render preview and bring in download/email buttons
    document.getElementById('outerSelector').classList.add('pushDown');
    document.getElementById('footer').classList.add('pushDown');
    document.getElementById('progressBar').classList.add('pushLeft');
    document.getElementById('title').classList.add('pushUp');
    document.getElementById('header').classList.add('pushUp');
    document.getElementById('previewPony').classList.add('previewScaled100pc');
    document.getElementById('cta').classList.add('grow2');
    document.getElementById('outerSelector').classList.remove('pushDownUndo');
    document.getElementById('footer').classList.remove('pushDownUndo');
    document.getElementById('progressBar').classList.remove('pushLeftUndo');
    document.getElementById('title').classList.remove('pushUpUndo');
    document.getElementById('header').classList.remove('pushUpUndo');
}

function removePreview() {
    //leave preview mode, returning elements to normal positions
    document.getElementById('outerSelector').classList.add('pushDownUndo');
    document.getElementById('footer').classList.add('pushDownUndo');
    document.getElementById('progressBar').classList.add('pushLeftUndo');
    document.getElementById('title').classList.add('pushUpUndo');
    document.getElementById('header').classList.add('pushUpUndo');
    document.getElementById('outerSelector').classList.remove('pushDown');
    document.getElementById('footer').classList.remove('pushDown');
    document.getElementById('progressBar').classList.remove('pushLeft');
    document.getElementById('title').classList.remove('pushUp');
    document.getElementById('header').classList.remove('pushUp');
    document.getElementById('previewPony').classList.remove('previewScaled100pc');
    document.getElementById('cta').classList.remove('grow2');
}

