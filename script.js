// Fungsi showSidebar
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

// Welcome Text Language Switch
const welcomeMessages = [
    "Selamat Datang",           // Indonesia
    "مرحباً بكم",              // Arab
    "Welcome",                  // Inggris
    "Bienvenue",                // Prancis
    "Willkommen",               // Jerman
    "ようこそ (Yōkoso)",        // Jepang
    "환영합니다 (Hwanyeonghamnida)", // Korea
    "Добро пожаловать (Dobro pozhalovat')", // Rusia
    "欢迎 (Huānyíng)"           // Cina
];

let currentIndex = 0;
const welcomeText = document.querySelector('.welcome-text');

function changeLanguage() {
    welcomeText.textContent = welcomeMessages[currentIndex];
    currentIndex = (currentIndex + 1) % welcomeMessages.length; // Loop kembali ke awal
}

// Array bahasa untuk About Us
const aboutUsTitles = [
    "Tentang Kami",  // Indonesia
    "About Us",   // Inggris
    "من نحن"   // Arab
];

const aboutUsMessages = [
    "Kami adalah Annida Magazine, sebuah organisasi yang berdedikasi untuk menciptakan majalah berbasis Islami. Dengan semangat keislaman, kami berkomitmen untuk menyajikan konten yang inspiratif, edukatif, dan relevan bagi generasi muda Muslim. Didirikan oleh para santri dan pelajar, Annida Magazine bertujuan menjadi wadah kreativitas sekaligus media dakwah yang menyebarkan nilai-nilai kebaikan.", // Indonesia
    "We are Annida Magazine, an organization dedicated to creating Islamic-based magazines. With a spirit of Islam, we are committed to presenting inspirational, educational, and relevant content for the younger Muslim generation. Founded by santri and students, Annida Magazine aims to serve as a platform for creativity as well as a medium of da'wah to spread the values of goodness.",// Inggris
    "نحن مجلة أنيدة، وهي منظمة مكرسة لإصدار مجلات إسلامية. وبروح إسلامية، نحن ملتزمون بتقديم محتوى ملهم وتثقيفي وتربوي وملائم لجيل الشباب المسلم. تهدف مجلة أنيدة، التي أسسها طلاب وطالبات علم، إلى أن تكون منبراً للإبداع ووسيلة للدعوة التي تنشر القيم الحميدة." //Arab
];

// Elemen DOM
const aboutUsTitle = document.querySelector('.aboutUs-title');
const aboutUsText = document.querySelector('.aboutUs-text');
const languageSlider = document.getElementById('languageSlider');

// Fungsi untuk mengganti bahasa berdasarkan nilai slider
function updateLanguage() {
    const sliderValue = parseInt(languageSlider.value); // Ambil nilai slider (0 atau 1)
    aboutUsTitle.textContent = aboutUsTitles[sliderValue];
    aboutUsText.textContent = aboutUsMessages[sliderValue];

    // Atur arah teks untuk bahasa Arab
    if (sliderValue === 2) {
        aboutUsText.classList.add('rtl');
    } else {
        aboutUsText.classList.remove('rtl');
    }
}

// Event listener untuk slider
languageSlider.addEventListener('input', updateLanguage);

// Mulai pergantian bahasa setelah halaman dimuat
window.addEventListener('load', () => {
    // Set teks awal
    if (welcomeText) {
        welcomeText.textContent = welcomeMessages[0];
    }
    setInterval(changeLanguage, 2000); // Ganti welcome text setiap 2 detik
}, { once: true }); // Gunakan { once: true } untuk mencegah duplikat listener);

// Fungsi untuk memeriksa apakah elemen ada di viewport---------------------------------------------------------------------------- reveal
function isElementInViewport(el, offset = 0) {
    if (!el) {
        console.warn("Elemen tidak ditemukan di isElementInViewport");
        return false; // Kembalikan false jika elemen null
    }
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset
    );
}

// Scroll Animation for About Us Content
function revealAboutUs() {
    const aboutUsContent = document.querySelector('.aboutUs-content');
    if (isElementInViewport(aboutUsContent, 100)) {
        aboutUsContent.classList.add('visible');
    } else {
        aboutUsContent.classList.remove('visible'); // Hapus saat keluar dari viewport
    }
}

// Scroll Animation for E-Magazine Cards
function revealCards() {
    const cards = document.querySelectorAll('.card');
    const screenHeight = window.innerHeight;
  
    cards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top;
      if (cardPosition < screenHeight * 0.8) {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 200);
      } else {
        card.classList.remove('visible');
      }
    });
  }

function revealStudentCorner() {
    const studentCornerContent = document.querySelector('.student-corner-content');
    if (isElementInViewport(studentCornerContent, 100)) {
        studentCornerContent.classList.add('visible');
    } else {
        studentCornerContent.classList.remove('visible');
    }
}

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
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Pastikan tidak negatif

    // Jalankan animasi lainnya
    revealAboutUs();
    revealCards();
    revealStudentCorner();
});

// Jalankan animasi saat scroll
window.addEventListener('scroll', () => {
    revealAboutUs();
    revealCards(); // Ganti revealEMagazine dengan revealCards
    revealStudentCorner();
});

// Jalankan animasi saat halaman dimuat
window.addEventListener('load', () => {
    updateLanguage(); // Untuk slider About Us
    setInterval(changeLanguage, 2000); // Untuk welcome text
    revealAboutUs();
    revealCards(); // Ganti revealEMagazine dengan revealCards
    revealStudentCorner();
}); 

//event listener untuk keyboard

document.querySelector('.menu-button').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showSidebar();
    }
});

document.querySelector('.header-logo').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleOptions();
    }
});

// glowing effect
let isScrolling;

// Deteksi saat scroll terjadi
window.addEventListener('scroll', () => {
    document.documentElement.classList.add('scrolling');

    // Hentikan animasi setelah scroll selesai
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        document.documentElement.classList.remove('scrolling');
    }, 150); // Animasi berhenti 150ms setelah scroll berhenti
});

// Overlay untuk E-Magazine ----------------------------------------------------------------------------------------------------
const overlay = document.getElementById('magazineOverlay');
const flipbookLink = document.getElementById('flipbookLink');
const memberLink = document.getElementById('memberLink');
const cards = document.querySelectorAll('.card[data-edition]');

cards.forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah perilaku default
    const edition = card.getAttribute('data-edition');
    
    // Atur tautan berdasarkan edisi yang diklik dengan struktur folder baru
    flipbookLink.setAttribute('href', `e-magazine/flipbook/e-magazine_e${edition}.html`);
    memberLink.setAttribute('href', `e-magazine/members/e${edition}_members.html`);
    
    // Tampilkan overlay
    overlay.classList.add('active');
  });
});

// Tutup overlay saat klik di luar pilihan
document.addEventListener('click', (e) => {
  if (overlay.classList.contains('active') && !e.target.classList.contains('overlay-option') && !e.target.closest('.card')) {
    overlay.classList.remove('active');
  }
});

// Tutup overlay dan navigasi ke halaman saat opsi diklik
document.querySelectorAll('.overlay-option').forEach(option => {
    option.addEventListener('click', (e) => {
      overlay.classList.remove('active'); // Tutup overlay
      // Navigasi akan terjadi secara default karena href sudah diatur
    });
  });

// Animasi kartu menjauhi kursor ----------------------------------------------------------------------------------------------------
document.querySelectorAll('.competition-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect(); // Dapatkan posisi dan ukuran kartu
        const centerX = rect.left + rect.width / 2; // Titik tengah X kartu
        const centerY = rect.top + rect.height / 2; // Titik tengah Y kartu
        const mouseX = e.clientX; // Posisi X kursor
        const mouseY = e.clientY; // Posisi Y kursor

        // Hitung jarak dari kursor ke pusat kartu
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // Batasi jarak pergerakan (misalnya maksimum 20px)
        const maxDistance = 30;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const moveX = (deltaX / distance) * maxDistance * -1; // Menjauhi kursor
        const moveY = (deltaY / distance) * maxDistance * -1; // Menjauhi kursor

        // Terapkan transformasi
        item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Kembali ke posisi awal saat kursor meninggalkan kartu
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translate(0, 0)';
    });
});

// Smooth scrolling untuk semua link dengan hash (#) --------------------------------------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Hanya proses jika href adalah ID (diawali dengan #)
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            const sidebar = document.querySelector('.list-menu-sidebar');
            const headerHeight = document.querySelector('header').offsetHeight || 0;

            if (targetElement) {
                if (sidebar && sidebar.classList.contains('active')) {
                    const menuButton = document.querySelector('.menu-button');
                    if (menuButton) {
                        menuButton.focus();
                    }
                    hideSidebar();
                    setTimeout(() => {
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                } else {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                console.warn(`Elemen dengan ID ${targetId} tidak ditemukan`);
            }
        }
        // Jika bukan hash (misalnya link overlay), biarkan perilaku default
    });
});