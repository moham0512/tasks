function onLoad() {
    const slides = document.getElementById('slides');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');


    let timeout = 1000;
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
        // animating = true;
    }

    function moveRight() {
        console.log(styles.left);
        const left = parseInt(lastSlide.style.left);
        console.log(left);
        lastSlide.style.left = (left + speed) + 'px';
        if (left < 800) {
            requestAnimationFrame(moveRight);
        }
    }

}

document.addEventListener('DOMContentLoaded', onLoad);