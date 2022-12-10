const iconHamburger = document.querySelector('.hamburger');
if (iconHamburger) {
    const menuHeader = document.querySelector('.menu__header');
    const logo = document.querySelector('.logo__wrapper');
    const logoImg = document.querySelector('.logo__image');
    if (window.innerWidth <= 640) {
        logoImg.src = '../../assets/icons/logo_hamburger.svg';
    }
    
    
    iconHamburger.addEventListener('click', () => {
        menuHeader.classList.toggle('_active');
        iconHamburger.classList.toggle('_active');
        logo.classList.toggle('_active');
    });
}
