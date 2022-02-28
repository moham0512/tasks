function onLoad() {
    const slides = document.getElementById('slides');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    const slider = document.getElementById('slider');


    let styles = getComputedStyle(slider);
    
    let allSlide = slides.children;
    let images = [];
    for (let x = 0; x < allSlide.length; x++) {
        images[x] = allSlide[x].querySelector('img');
    }


    window.addEventListener('load', function() {
        if (this.innerWidth < 800) {
            for (let x = 0; x < images.length; x++) {
                images[x].style.width = `${this.innerWidth}px`;
            }
            slider.style.height = `${images[0].height}px`;
        } else {
            for (let x = 0; x < images.length; x++) {
                images[x].style.width = `800px`;
            }
        }
    });

    window.addEventListener('resize', function() {
        if (this.innerWidth < 800) {
            for (let x = 0; x < images.length; x++) {
                images[x].style.width = `${this.innerWidth}px`;
            }
            slider.style.height = `${images[0].height}px`;
        } else {
            for (let x = 0; x < images.length; x++) {
                images[x].style.width = `800px`;
            }
        }
    });



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

    
    let links = document.getElementById('links').children;
    let lastClass = slides.lastElementChild.className;

    setInterval(refresh , 10);

    // refresh();
    function refresh(){
        lastClass = slides.lastElementChild.className;
        for(let link of links){
            if(link.className == lastClass){
                if(link.previousElementSibling != null){
                    link.previousElementSibling.classList.remove('bck-white');
                }
                if(link.previousElementSibling == null){
                    links[links.length-1].classList.remove('bck-white');
                }
                link.classList.add('bck-white');
            }
        }
    }
    
    // slides.addEventListener('change' , function(){
    //     lastClass = slides.lastElementChild.className;
    //     for(let link of links){
    //         if(link.className == lastClass){
    //             link.previousElementSibling.classList.remove('bck-white');
    //             link.classList.add('bck-white');
    //         }
    //     }
    // });
    

}

document.addEventListener('DOMContentLoaded', onLoad);