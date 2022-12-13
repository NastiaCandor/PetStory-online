const iconHamburger = document.querySelector('.hamburger');
if (iconHamburger) {
    const menuHeader = document.querySelector('.menu__header');
    const logo = document.querySelector('.logo__wrapper');
    const logoImg = document.querySelector('.logo__image');
    const bg = document.querySelector('.menu__bg');
    if (window.innerWidth <= 640) {
        logoImg.src = '../../assets/icons/logo_hamburger.svg';
    }
    
    const toogleActiveClass = () => {
        menuHeader.classList.toggle('_active');
        iconHamburger.classList.toggle('_active');
        logo.classList.toggle('_active');
        bg.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    };
    
    iconHamburger.addEventListener('click', () => {
        toogleActiveClass();
    });
    bg.addEventListener('click', () => {
        toogleActiveClass();
    });
}
