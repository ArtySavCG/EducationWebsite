var swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3, // По умолчанию показывает 3 слайда
    spaceBetween: 26, // Расстояние между слайдами
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 5
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 5
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            if (index < 4) { 
                return '<span class="' + className + '"></span>';
            }
            return '';
        },
    },
    autoplay: {
        delay: 5000, 
        disableOnInteraction: false, 
    },
});

window.addEventListener('resize', () => {
    swiper.update();
});

swiper.on('slideChange', function () {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach((slide, index) => {
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
        if (index >= swiper.activeIndex && index < swiper.activeIndex + swiper.params.slidesPerView) {
            slide.style.opacity = '1';
            slide.style.pointerEvents = 'all';
        }
    });

    const totalSlides = swiper.slides.length - swiper.loopedSlides * 2; 
    const realIndex = swiper.realIndex; 
    const bulletIndex = realIndex % 4; 

    document.querySelectorAll('.swiper-pagination-bullet').forEach(function (bullet, index) {
        bullet.classList.remove('swiper-pagination-bullet-active');
        if (index === bulletIndex) {
            bullet.classList.add('swiper-pagination-bullet-active');
        }
    });
});

swiper.emit('slideChange');

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');

burger.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    burger.classList.toggle('burger--active');
    overlay.classList.toggle('overlay--active', isActive); 
});

const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('burger--active');
        overlay.classList.remove('overlay--active'); 
    });
});

overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('burger--active');
    overlay.classList.remove('overlay--active');
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetSection = document.querySelector(this.getAttribute('href'));

        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // 'start', 'center', 'end', or 'nearest'
        });
    });
});

// Получаем кнопку
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Добавляем обработчик события прокрутки
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    // Проверяем положение прокрутки страницы
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block"; // Показываем кнопку, если прокрутили вниз
    } else {
        scrollToTopBtn.style.display = "none"; // Скрываем кнопку, если вернулись наверх
    }
}

// Добавляем обработчик события клика для кнопки
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавная прокрутка наверх
    });
});