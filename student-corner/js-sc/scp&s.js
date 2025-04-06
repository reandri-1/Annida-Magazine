// Fungsi showSidebar
function showSidebar() {
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
}

// Fungsi hideSidebar
function hideSidebar() {
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
}

// Logo Options Toggle
function toggleOptions() {
    const sidebar = document.querySelector('.list-menu-sidebar');
    if (!sidebar.classList.contains('active')) {
        const options = document.getElementById('logoOptions');
        options.classList.toggle('active');
        const isExpanded = options.classList.contains('active');
        options.setAttribute('aria-expanded', isExpanded ? 'true' : 'false'); // Perbarui status
    }
}

// Animasi gerakan acak
const items = document.querySelectorAll('.gallery-item');
items.forEach(item => {
    let x = Math.random() * (window.innerWidth - 200);
    let y = Math.random() * (window.innerHeight - 200);
    let dx = (Math.random() - 0.5) * 2; // Kecepatan X
    let dy = (Math.random() - 0.5) * 2; // Kecepatan Y

    function animate() {
        x += dx;
        y += dy;

        // Pantulkan jika menyentuh batas
        if (x <= 0 || x >= window.innerWidth - 200) dx = -dx;
        if (y <= 0 || y >= window.innerHeight - 200) dy = -dy;

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        requestAnimationFrame(animate);
    }
    animate();
}); 

// Fungsi untuk overlay
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.gallery-item');
    const overlay = document.getElementById('overlay');
    const overlayContent = overlay ? overlay.querySelector('.overlay-content') : null;

    console.log('Jumlah gallery-item ditemukan:', items.length);
    items.forEach((item, index) => {
        console.log(`Item ${index}:`, item);
    });

    if (!overlay || !overlayContent) {
        console.error('Overlay atau overlay-content tidak ditemukan!');
        return;
    }

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const content = item.getAttribute('data-content');
            const type = item.getAttribute('data-type');
            const title = item.querySelector('h3').textContent;
            const authorInfo = item.querySelector('p:nth-child(2)').textContent;

            console.log('Item diklik:', { type, content, title, authorInfo });

            if (type === 'text') {
                overlayContent.innerHTML = `
                    <h3>${title}</h3>
                    <p>${authorInfo}</p>
                    <p>${content.replace(/<br>/g, '<br>')}</p>
                `;
            }

            overlay.style.display = 'flex';
            setTimeout(() => overlay.classList.add('active'), 10);
        });
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.style.display = 'none', 400);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.style.display = 'none', 400);
        }
    });

    // Animasi gerakan acak
    items.forEach(item => {
        // Dapatkan lebar dan tinggi kotak secara dinamis
        const itemWidth = item.offsetWidth;
        const itemHeight = item.offsetHeight;

        let x = Math.random() * (window.innerWidth - itemWidth);
        let y = Math.random() * (window.innerHeight - itemHeight);
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;

        function animate() {
            x += dx;
            y += dy;

            // Pastikan kotak tidak melewati batas layar
            if (x <= 0 || x >= window.innerWidth - itemWidth) dx = -dx;
            if (y <= 0 || y >= window.innerHeight - itemHeight) dy = -dy;

            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            requestAnimationFrame(animate);
        }
        animate();
    });

    // Update posisi saat ukuran layar berubah
    window.addEventListener('resize', () => {
        items.forEach(item => {
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;
            let x = parseFloat(item.style.left) || 0;
            let y = parseFloat(item.style.top) || 0;

            // Pastikan kotak tetap di dalam layar
            if (x < 0) x = 0;
            if (x > window.innerWidth - itemWidth) x = window.innerWidth - itemWidth;
            if (y < 0) y = 0;
            if (y > window.innerHeight - itemHeight) y = window.innerHeight - itemHeight;

            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
        });
    });
});
