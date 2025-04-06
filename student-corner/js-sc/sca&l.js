document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.image-slide');
    let currentSlide = 0;

    console.log('Jumlah slide ditemukan:', slides.length);

    // Aktifkan slide pertama
    if (slides.length > 0) {
        slides[currentSlide].classList.add('active');
    }

    // Intersection Observer untuk mendeteksi slide yang terlihat
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% dari slide harus terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideIndex = Array.from(slides).indexOf(entry.target);
                console.log(`Slide ${slideIndex} terlihat`);
                slides.forEach(slide => slide.classList.remove('active'));
                entry.target.classList.add('active');
                currentSlide = slideIndex;
            }
        });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    // Pastikan halaman punya tinggi cukup untuk scroll
    document.querySelector('.image-gallery').style.height = `${slides.length * 100}vh`;
    // Fungsi showSidebar
    window.showSidebar = function() {
        const sidebar = document.querySelector('.list-menu-sidebar');
        const body = document.body;
        const header = document.querySelector('header');
        const logoOptions = document.getElementById('logoOptions');

        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sidebar.classList.add('active');
        sidebar.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
        body.classList.add('sidebar-open');
        header.classList.add('sidebar-active');

        if (logoOptions.classList.contains('active')) {
            logoOptions.classList.remove('active');
        }

        body.style.top = `-${scrollPosition}px`;
        body.style.position = 'fixed';
        body.style.width = '100%';
    };

    // Fungsi hideSidebar
    window.hideSidebar = function() {
        const sidebar = document.querySelector('.list-menu-sidebar');
        const body = document.body;
        const header = document.querySelector('header');
        const menuButton = document.querySelector('.menu-button');

        if (document.activeElement && sidebar.contains(document.activeElement)) {
            if (menuButton) {
                menuButton.focus();
            }
        }

        sidebar.classList.remove('active');
        sidebar.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
        body.classList.remove('sidebar-open');
        header.classList.remove('sidebar-active');

        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
    };

    // Logo Options Toggle
    window.toggleOptions = function() {
        const sidebar = document.querySelector('.list-menu-sidebar');
        if (!sidebar.classList.contains('active')) {
            const options = document.getElementById('logoOptions');
            options.classList.toggle('active');
            const isExpanded = options.classList.contains('active');
            options.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
    };
});

// Header Hide/Show on Scroll
let lastScrollTop = 0;
const header = document.querySelector('header');

// Tutup Sidebar dan Logo Options saat klik di luar
document.addEventListener('click', (event) => {
    const sidebar = document.querySelector('.list-menu-sidebar');
    const logoOptions = document.getElementById('logoOptions');
    const logo = document.querySelector('.header-logo');
    const menuButton = document.querySelector('.menu-button');

    // Jika klik bukan di sidebar, tombol menu, logo, atau logo-options
    if (
        !sidebar.contains(event.target) &&
        !logoOptions.contains(event.target) &&
        !logo.contains(event.target) &&
        !menuButton.contains(event.target)
    ) {
        if (sidebar.classList.contains('active')) {
            hideSidebar(); // Tutup sidebar jika terbuka
        }
        if (logoOptions.classList.contains('active')) {
            logoOptions.classList.remove('active'); // Tutup logo options jika terbuka
        }
    }
});

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll ke bawah
        header.classList.add('hidden');
    } else {
        // Scroll ke atas
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
