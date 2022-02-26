function onLoad() {
    const slides = document.getElementById('slides');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');


    let timeout = 3000;
    let speed = 10;

    let allSlides;
    let lastSlide;
    let nextTimeout;
    let animating = false;

    nextTimeout = setTimeout(nextSlide, timeout);

    function nextSlide() {
        allSlides = document.querySelectorAll('#slides div');
        lastSlide = allSlides[allSlides.length - 1];
        requestAnimationFrame(moveRight);
        animating = true;
    }

    function moveRight() {
        const left = Number(lastSlide.style.left.substring(0, lastSlide.style.left.length - 2));
        lastSlide.style.left = (left + speed) + 'px';
        if (left < 800) {
            requestAnimationFrame(moveRight);
        } else {
            slides.insertBefore(lastSlide, slides.firstChild);
            lastSlide.style.left = '0';
            nextTimeout = setTimeout(nextSlide, timeout);
            animating = false;
        }
    }

    nextButton.addEventListener('click', function() {
        if (!animating) {
            clearTimeout(nextTimeout);
            nextSlide();
        }
    });

    previousButton.addEventListener('click', function() {
        if (!animating) {
            clearTimeout(nextTimeout);
            previousSlide();
        }
    });

    function previousSlide() {
        allSlides = document.querySelectorAll('#slides div');
        firstSlide = allSlides[0];
        slides.appendChild(firstSlide);
        firstSlide.style.left = '800px';
        requestAnimationFrame(moveLeft);
        animating = true;
    }

    function moveLeft() {
        let left = Number(firstSlide.style.left.substring(0, firstSlide.style.left.length - 2));
        firstSlide.style.left = (left - speed) + 'px';
        if (left > 10) {
            requestAnimationFrame(moveLeft);
        } else {
            nextTimeout = setTimeout(nextSlide, timeout);
            animating = false;
        }
    }


}

document.addEventListener('DOMContentLoaded', onLoad);