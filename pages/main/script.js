import {animalImages} from './animals.js';
import {testimonials} from './testimonials.js';

window.onload = function() {
    // CHOOSE section functions onload
    showSlides(slidersPosition);
    moveCarousel();
    // adding testimonials
    addTestimonials();
    // testimonials popup
    popupTestimonials();
    
};

// CHOOSE SECTION

const gridPrev = document.getElementById('grid_prev');
const gridCurr = document.getElementById('grid_curr');
const gridNext = document.getElementById('grid_next');
const animalSlider = document.querySelector('.animal__slider');
const leftButton = document.querySelector('.btn_left_animal');
const rightButton = document.querySelector('.btn_right_animal');

// get random pics order for carousel
const getRandomPics = (max) => {
    let randomOrder = [];
    for (let i = 0; i <= max; i++) {
        randomOrder.push(i);
    }
    randomOrder.sort(() => Math.random()-0.5);
    return randomOrder;
};
const randomOrder = getRandomPics(Object.keys(animalImages).length - 1);

// how much pics is displayed according to screen size
const checkMaxPicsViewd = () => {
    if (window.innerWidth <= 920) { // 640
        return 4;
    } else {
        return 6;
    }
};
const picsViewed = checkMaxPicsViewd();   

let slidersPosition = [];

// packing pics in stackes according viewed pics
const getRandomPacks = (pics) => {
    const packs = (randomOrder.length) / pics;
    let final = [];
    let temp = [];
    for (let i = 1; i <= packs; i++) {
        for (let j = (i*pics) - pics; j < (i*pics); j++) {
            temp.push(randomOrder[j]);
        }
        final.push(temp);
        temp = [];
    }
    // set sliders the first time
    slidersPosition = [(final.length - 1), 0, 1];
    // console.log(slidersPosition);
    return final;
};
const randomPacks = getRandomPacks(picsViewed);

// positioning slides -1 for left, 0 for middle, 1 for right
const changeSlidersPosition = (curr) => { 
    slidersPosition[1] = curr;
    if ((curr + 1) > (randomPacks.length - 1)) {
        slidersPosition[2] = 0;
    } else {
        slidersPosition[2] = curr + 1;
    }

    if ((curr - 1) < 0) {
        slidersPosition[0] = randomPacks.length - 1;
    } else {
        slidersPosition[0] = curr - 1;
    }
};

// display slides for the first time
const showSlides = (slidersPosition) => {
    addAnimalPicsCarousel(slidersPosition[0], -1); 
    addAnimalPicsCarousel(slidersPosition[1], 0); 
    addAnimalPicsCarousel(slidersPosition[2], 1);
};

// add pics on screen
const addAnimalPicsCarousel = (packNum, position) => {
    for (let key of randomPacks[packNum]) {
        let img = document.createElement('img');
        img.src = `../../assets/images/grid-photo/pic_${key}.png`;
        img.classList.add('animal__img_content');
        img.setAttribute('data-id', key);
    
        let animalImg = document.createElement('div');
        animalImg.classList.add('animal__img');
        animalImg.appendChild(img);
        
        let infoPanel = document.createElement('div');
        infoPanel.classList.add('info__panel');
    
        let animalName =  document.createElement('p');
        animalName.innerHTML = animalImages[key].name;
        animalName.classList.add('animal__name');
        infoPanel.appendChild(animalName);
    
        let animalNative =  document.createElement('p');
        animalNative.innerHTML = animalImages[key].despription;
        animalNative.classList.add('animal__native');
        infoPanel.appendChild(animalNative);
    
        let foodImage = document.createElement('img');
        if (animalImages[key].food == 'meat') {
            foodImage.src = '../../assets/icons/meet-fish_icon.svg';
    
        } else {
            foodImage.src = '../../assets/icons/banana-bamboo_icon.svg';
        }
        
        foodImage.classList.add('img__food');
        infoPanel.appendChild(foodImage);
    
        let grid = document.createElement('div');
        grid.classList.add('animal__content');
        
    
        let block = document.createElement('div');
        block.classList.add('animal__block');
        
        block.appendChild(infoPanel);
        block.appendChild(animalImg);
        grid.appendChild(block);

        if (position == -1) {
            gridPrev.appendChild(grid);
        } else if (position == 0) {
            gridCurr.appendChild(grid);
        } else {
            gridNext.appendChild(grid);
        }
        
    }
};

// change slides position in circle
const changeSlides = (n) => {
    if (n < 1) {
        slideIndex = randomPacks.length;
    }
    if (n > (randomPacks.length)) {
        slideIndex =  1;
    }

    changeSlidersPosition(slideIndex - 1);
};

let slideIndex = 1;
// enable carousel movement
const moveCarousel = () => {
    // prev click
    leftButton.addEventListener("click", () => {
        // if not in movement
        if ((!animalSlider.classList.contains('transition-right')) && (!animalSlider.classList.contains('transition-left'))) {
            changeSlides(slideIndex -= 1); // shift indexes
            animalSlider.classList.add('transition-left'); //transitioning
        } 
    });
    // next click
    rightButton.addEventListener("click", () => {
        // if not in movement
        if ((!animalSlider.classList.contains('transition-right')) && (!animalSlider.classList.contains('transition-left'))) {
            changeSlides(slideIndex += 1);
            animalSlider.classList.add('transition-right');
        }
    });
};

// movement of carousel
animalSlider.addEventListener('animationend', (animationEvent) => {
    // next btn clicked then
    if (animationEvent.animationName == "click-right") {
        animalSlider.classList.remove('transition-right');
        gridPrev.innerHTML = gridCurr.innerHTML; // move curr to prev
        gridCurr.innerHTML = gridNext.innerHTML; // move nect to curr
        gridNext.innerHTML = ''; // delete next grid
        addAnimalPicsCarousel(slidersPosition[2], 1); // create next grid
        
    } else { // prev btn clicked then
        animalSlider.classList.remove('transition-left');
        gridNext.innerHTML = gridCurr.innerHTML; // move curr to next
        gridCurr.innerHTML = gridPrev.innerHTML; // move prev to curr
        gridPrev.innerHTML = ''; // delete prev grid
        addAnimalPicsCarousel(slidersPosition[0], -1); // create prev grid
    }
});

// TESTIMONIALS SECTION

const addTestimonials = () => {
    for (let key in testimonials) {
        let img = document.createElement('img');
        img.src = `../../assets/icons/user_photo/${testimonials[key].icon}`;
        img.classList.add('img__icon');
        // img.setAttribute('data-id', key);
    
        let name = document.createElement('p');
        name.classList.add('testim__name');
        name.innerHTML = testimonials[key].name;
    
        let localDate = document.createElement('p');
        localDate.classList.add('testim__date');
        localDate.innerHTML = `Local ${testimonials[key].local} • ${testimonials[key].date}`;
    
        let text = document.createElement('p');
        text.classList.add('testim__text');
        text.innerHTML = testimonials[key].text;
    
        let hat = document.createElement('div');
        hat.classList.add('testim__hat');
        hat.appendChild(img);
    
        let userInfo = document.createElement('div');
        userInfo.classList.add('testim__user__info');
        userInfo.appendChild(name);
        userInfo.appendChild(localDate);
        hat.appendChild(userInfo);
    
        let content = document.createElement('div');
        content.classList.add('testim__content');
        content.appendChild(hat);
        content.appendChild(text);
    
        let grid = document.createElement('div');
        grid.classList.add('testim__item');
        grid.setAttribute('data-id', key);
        grid.appendChild(content);
    
        document.getElementById('testim-grid').appendChild(grid);
    }
};

const checkDisplayWidthTestimonials = () => {
    if (window.innerWidth <= 920) { // 640
        return 4;
    } else {
        return 6;
    }
};

document.querySelector('input[type="range"]').addEventListener('input', (event) => {
    let transformValue = (event.target.value)*297;
    document.querySelector('#testim-grid').style.cssText = `transform: translateX(-${transformValue}px)`;
});

// POPUP

const popupTestimonials = () => {
    if (window.innerWidth <= 640) { // 640
        // click on testimonials to open full
        document.querySelector('.testim_grid_wrapper').addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('.popup__bg').classList.toggle('_active');
            document.querySelector('.popup__wrapper').classList.toggle('_active');
            // putting testimonials content into popup
            document.querySelector('._popup_content').innerHTML = event.path[event.path.length - 11].innerHTML;
        });
        
        const closePopup = () => {
            document.querySelector('.popup__bg').classList.toggle('_active');
                document.querySelector('.popup__wrapper').classList.toggle('_active');
        };

        document.addEventListener('click', (event) => {
            if (event.target === document.querySelector('.popup__bg')) {
                closePopup();
            }
        });

        document.querySelector('.popup_close').addEventListener('click', () => {
            closePopup();
        });
    }    
};




// // click on testimonials to open full
// document.querySelectorAll('.testim__item').addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log(event.value);
//     // console.log(event.path.indexOf('div.testim__content'));


//     document.querySelector('.popup__bg').classList.toggle('_active');
//     document.querySelector('.popup__wrapper').classList.toggle('_active');
//     // putting testimonials content into popup
//     document.querySelector('._popup_content').innerHTML = event.path[1].innerHTML;
// });

// document.querySelector('.popup__bg').addEventListener('click', () => {
//     document.querySelector('.popup__bg').classList.toggle('_active');
//     document.querySelector('.popup__wrapper').classList.toggle('_active');
// });
// };