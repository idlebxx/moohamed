import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

// ========== 1. خلفية Three.js 3D جزيئات متحركة ==========
const canvas = document.getElementById('bgCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// جزيئات نيون سايبر بنك
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 200;
    posArray[i+1] = (Math.random() - 0.5) * 100;
    posArray[i+2] = (Math.random() - 0.5) * 100;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x00ffff,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// جزيئات إضافية بلون وردي
const particlesMaterial2 = new THREE.PointsMaterial({
    size: 0.15,
    color: 0xff00ff,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
});
const particlesMesh2 = new THREE.Points(particlesGeometry, particlesMaterial2);
scene.add(particlesMesh2);

camera.position.z = 30;

// أنيميشن الخلفية
function animateBackground() {
    requestAnimationFrame(animateBackground);
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    particlesMesh2.rotation.y -= 0.0008;
    particlesMesh2.rotation.x += 0.0003;
    renderer.render(scene, camera);
}
animateBackground();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========== 2. تأثير الكتابة التلقائية (Typing Effect) ==========
const typingElement = document.getElementById('typingElement');
const texts = {
    ar: [
        'مبرمج تطبيقات ومواقع ويب',
        'مطور بوتات تلجرام احترافية',
        'مهندس أدوات اختراق أخلاقي',
        'IDLEB X - 19 سنة فقط'
    ],
    en: [
        'Apps & Web Developer',
        'Professional Telegram Bots Developer',
        'Ethical Hacking Tools Engineer',
        'IDLEB X - Only 19 Years Old'
    ]
};

let currentLang = 'ar';
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentTexts = texts[currentLang];
    const currentText = currentTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % currentTexts.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

// ========== 3. تبديل اللغة (عربي/إنجليزي) ==========
const translations = {
    ar: {
        logo: 'IDLEB<span>X</span>',
        'nav-home': 'الرئيسية',
        'nav-about': 'عني',
        'nav-skills': 'مهاراتي',
        'nav-projects': 'مشاريعي',
        'nav-pen': 'اختبار الاختراق',
        'nav-contact': 'تواصل',
        'name': 'محمد <span>IDLEB X</span>',
        'download-cv': 'تحميل السيرة الذاتية PDF',
        'contact-me': 'تواصل معي',
        'about-title': 'من أنا؟',
        'about-name': 'أنا محمد، البالغ من العمر 19 عامًا، والمعروف في الأوساط التقنية بـ IDLEB X.',
        'about-desc1': 'مبرمج تطبيقات ومواقع ويب، ومطور بوتات تلجرام احترافية، ومهندس أدوات اختراق أخلاقي.',
        'about-desc2': 'على الرغم من عمري الصغير، أمتلك العديد من المشاريع الحقيقية التي أثبت فيها قدرتي على بناء حلول رقمية متكاملة.',
        'stat-projects': 'مشروع',
        'stat-years': 'سنوات خبرة',
        'stat-clients': 'عميل',
        'skills-title': 'مهاراتي الاحترافية',
        'skill1-title': 'تطوير تطبيقات ومواقع',
        'skill2-title': 'بوتات تلجرام',
        'skill3-title': 'أدوات اختراق أخلاقي',
        'skill4-title': 'قواعد بيانات',
        'projects-title': 'أبرز مشاريعي',
        'pen-title': '🧪 مختبر اختبار الاختراق التجريبي',
        'pen-intro': 'هذا بيئة محاكاة احترافية لاختبار الاختراق الأخلاقي. جميع الأدوات والاختبارات آمنة وقانونية للعرض فقط.',
        'pen-scan': 'مسح الثغرات',
        'pen-exploit': 'اختبار الاختراق',
        'pen-crack': 'اختبار كلمات المرور',
        'pen-network': 'تحليل الشبكة',
        'qr-title': 'رابط بوت التلجرام للاختبارات الأمنية',
        'qr-desc': 'امسح الكود لفتح بوت الاختبارات الأمنية',
        'contact-title': 'تواصل معي',
        'contact-ready': 'جاهز للعمل الآن - لا تتردد بالتواصل',
        'send': 'إرسال الرسالة',
        'rights': 'جميع الحقوق محفوظة'
    },
    en: {
        logo: 'IDLEB<span>X</span>',
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-pen': 'Pen Testing',
        'nav-contact': 'Contact',
        'name': 'Mohammed <span>IDLEB X</span>',
        'download-cv': 'Download CV PDF',
        'contact-me': 'Contact Me',
        'about-title': 'Who Am I?',
        'about-name': 'I am Mohammed, 19 years old, known in tech circles as IDLEB X.',
        'about-desc1': 'Apps & Web Developer, Professional Telegram Bots Developer, Ethical Hacking Tools Engineer.',
        'about-desc2': 'Despite my young age, I have many real projects proving my ability to build complete digital solutions.',
        'stat-projects': 'Projects',
        'stat-years': 'Years Exp',
        'stat-clients': 'Clients',
        'skills-title': 'My Professional Skills',
        'skill1-title': 'Apps & Web Dev',
        'skill2-title': 'Telegram Bots',
        'skill3-title': 'Ethical Hacking',
        'skill4-title': 'Databases',
        'projects-title': 'My Key Projects',
        'pen-title': '🧪 Ethical Hacking Lab',
        'pen-intro': 'This is a professional ethical hacking simulation environment. All tools and tests are safe and legal for demonstration only.',
        'pen-scan': 'Vulnerability Scan',
        'pen-exploit': 'Penetration Test',
        'pen-crack': 'Password Test',
        'pen-network': 'Network Analysis',
        'qr-title': 'Telegram Bot for Security Tests',
        'qr-desc': 'Scan the QR code to open the security testing bot',
        'contact-title': 'Contact Me',
        'contact-ready': 'Ready to work now - Feel free to reach out',
        'send': 'Send Message',
        'rights': 'All Rights Reserved'
    }
};

document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const toggleBtn = document.getElementById('langToggle');
    toggleBtn.innerHTML = currentLang === 'ar' ? '<i class="fas fa-globe"></i> EN' : '<i class="fas fa-globe"></i> AR';
    
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[currentLang][key]) {
            if (key === 'logo') {
                el.innerHTML = translations[currentLang][key];
            } else if (key === 'name') {
                el.innerHTML = translations[currentLang][key];
            } else {
                el.textContent = translations[currentLang][key];
            }
        }
    });
    
    // إعادة تعيين تأثير الكتابة
    charIndex = 0;
    textIndex = 0;
    isDeleting = false;
});

// ========== 4. عداد متحرك للأرقام ==========
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// تفعيل العداد عند ظهور القسم
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumber(document.getElementById('statProjects'), 19);
            animateNumber(document.getElementById('statYears'), 3);
            animateNumber(document.getElementById('statClients'), 47);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.about-stats');
if (statsSection) observer.observe(statsSection);

// ========== 5. زر تحميل PDF و QR Code ==========
document.getElementById('downloadPDF').addEventListener('click', () => {
    alert('https://anytourl.com/s/81830688496704564');
    // window.open('cv.pdf', '_blank');
});

// إنشاء QR Code لبوت التلجرام
new QRCode(document.getElementById('qrcode'), {
    text: 'https://t.me/band_idlebx_bot',
    width: 120,
    height: 120
});

// ========== 6. قسم اختبار الاختراق التجريبي ==========
const terminalBody = document.getElementById('terminalBody');

function addTerminalLine(text) {
    const line = document.createElement('p');
    line.className = 'terminal-line';
    line.textContent = `$ ${text}`;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

window.simulateScan = function() {
    addTerminalLine('[SCAN] Starting vulnerability scan...');
    setTimeout(() => addTerminalLine('[SCAN] Target: 192.168.1.1'), 500);
    setTimeout(() => addTerminalLine('[SCAN] Open ports: 22, 80, 443, 8080'), 1200);
    setTimeout(() => addTerminalLine('[SCAN] Vulnerabilities found: 3 (Low:2, Medium:1)'), 1800);
    setTimeout(() => addTerminalLine('[SCAN] Report saved: scan_report_2025.txt'), 2300);
};

window.simulateExploit = function() {
    addTerminalLine('[EXPLOIT] Initializing Metasploit simulation...');
    setTimeout(() => addTerminalLine('[EXPLOIT] Targeting: Apache 2.4.49'), 600);
    setTimeout(() => addTerminalLine('[EXPLOIT] Exploit: CVE-2021-41773'), 1200);
    setTimeout(() => addTerminalLine('[EXPLOIT] Payload delivered successfully'), 1800);
    setTimeout(() => addTerminalLine('[EXPLOIT] Session opened - This is a SAFE simulation'), 2400);
};

window.simulateCrack = function() {
    addTerminalLine('[CRACK] Starting brute force simulation...');
    setTimeout(() => addTerminalLine('[CRACK] Dictionary attack in progress'), 700);
    setTimeout(() => addTerminalLine('[CRACK] Attempt 1247/10000'), 1300);
    setTimeout(() => addTerminalLine('[CRACK] Password found: ******** (simulated)'), 1900);
    setTimeout(() => addTerminalLine('[CRACK] Hash cracked in 3.2 seconds'), 2400);
};

window.simulateNetwork = function() {
    addTerminalLine('[NETWORK] Capturing packets...');
    setTimeout(() => addTerminalLine('[NETWORK] Interface: eth0'), 400);
    setTimeout(() => addTerminalLine('[NETWORK] Packets captured: 847'), 900);
    setTimeout(() => addTerminalLine('[NETWORK] Analyzing traffic flows...'), 1400);
    setTimeout(() => addTerminalLine('[NETWORK] Suspicious patterns: None detected'), 2000);
};

// ========== 7. وضع مظلم/مضيء ==========
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light');
    const icon = document.getElementById('themeToggle').querySelector('i');
    if (document.body.classList.contains('light')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// ========== 8. قائمة التنقل للجوال ==========
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// ========== 9. تأثير دخول العناصر بالتمرير (AOS) ==========
AOS.init({
    duration: 800,
    once: true
});

// ========== 10. نموذج الاتصال ==========
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'ar' ? 'تم إرسال رسالتك! سأتواصل معك قريباً' : 'Your message has been sent! I will contact you soon');
    e.target.reset();
});

// ========== 11. تأثير Glitch النيوني على الاسم ==========
const glitchElement = document.querySelector('.glitch-text');
if (glitchElement) {
    setInterval(() => {
        glitchElement.style.transform = `skew(${Math.random() * 5 - 2.5}deg)`;
        setTimeout(() => {
            glitchElement.style.transform = 'skew(0deg)';
        }, 100);
    }, 3000);
          }
