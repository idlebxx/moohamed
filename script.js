import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

// ========== شاشة التحميل ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        if (loadingScreen && mainContent) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.style.display = 'block';
            }, 500);
        }
    }, 1500);
});

// ========== خلفية Three.js ==========
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

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
}

// ========== تأثير الكتابة التلقائية ==========
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
    if (!typingElement) return;
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

// ========== تبديل اللغة ==========
const translations = {
    ar: {
        logo: 'IDLEB<span>X</span>',
        'nav-home': 'الرئيسية',
        'nav-about': 'عني',
        'nav-skills': 'مهاراتي',
        'nav-projects': 'مشاريعي',
        'nav-github': 'GitHub',
        'nav-pen': 'اختبار الاختراق',
        'nav-contact': 'تواصل',
        name: 'محمد <span>IDLEB X</span>',
        'download-cv': 'تحميل السيرة الذاتية PDF',
        'contact-me': 'تواصل معي',
        'about-title': 'من أنا؟',
        'about-name': 'أنا محمد، البالغ من العمر 19 عامًا، والمعروف في الأوساط التقنية بـ IDLEB X.',
        'about-desc1': 'مبرمج تطبيقات ومواقع ويب، ومطور بوتات تلجرام احترافية، ومهندس أدوات اختراق أخلاقي.',
        'about-desc2': 'على الرغم من عمري الصغير، أمتلك العديد من المشاريع الحقيقية.',
        'stat-projects': 'مشروع',
        'stat-years': 'سنوات خبرة',
        'stat-clients': 'عميل',
        'skills-title': 'مهاراتي الاحترافية',
        'skill1-title': 'تطوير تطبيقات ومواقع',
        'skill2-title': 'بوتات تلجرام',
        'skill3-title': 'أدوات اختراق أخلاقي',
        'skill4-title': 'قواعد بيانات',
        'projects-title': 'أبرز مشاريعي',
        'github-title': '📦 آخر مشاريعي على GitHub',
        'pen-title': '🧪 مختبر اختبار الاختراق التجريبي',
        'pen-intro': 'بيئة محاكاة احترافية لاختبار الاختراق الأخلاقي. جميع الأدوات آمنة وقانونية للعرض فقط.',
        'pen-scan': 'مسح الثغرات',
        'pen-exploit': 'اختبار الاختراق',
        'pen-crack': 'اختبار كلمات المرور',
        'pen-network': 'تحليل الشبكة',
        'qr-title': 'رابط بوت التلجرام للاختبارات الأمنية',
        'qr-desc': 'امسح الكود لفتح بوت الاختبارات الأمنية',
        'contact-title': 'تواصل معي',
        'contact-ready': 'جاهز للعمل الآن - لا تتردد بالتواصل',
        send: 'إرسال الرسالة',
        rights: 'جميع الحقوق محفوظة'
    },
    en: {
        logo: 'IDLEB<span>X</span>',
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-github': 'GitHub',
        'nav-pen': 'Pen Testing',
        'nav-contact': 'Contact',
        name: 'Mohammed <span>IDLEB X</span>',
        'download-cv': 'Download CV PDF',
        'contact-me': 'Contact Me',
        'about-title': 'Who Am I?',
        'about-name': 'I am Mohammed, 19 years old, known in tech circles as IDLEB X.',
        'about-desc1': 'Apps & Web Developer, Professional Telegram Bots Developer, Ethical Hacking Tools Engineer.',
        'about-desc2': 'Despite my young age, I have many real projects.',
        'stat-projects': 'Projects',
        'stat-years': 'Years Exp',
        'stat-clients': 'Clients',
        'skills-title': 'My Professional Skills',
        'skill1-title': 'Apps & Web Dev',
        'skill2-title': 'Telegram Bots',
        'skill3-title': 'Ethical Hacking',
        'skill4-title': 'Databases',
        'projects-title': 'My Key Projects',
        'github-title': '📦 My Latest GitHub Projects',
        'pen-title': '🧪 Ethical Hacking Lab',
        'pen-intro': 'Professional ethical hacking simulation environment. All tools are safe and legal for demonstration only.',
        'pen-scan': 'Vulnerability Scan',
        'pen-exploit': 'Penetration Test',
        'pen-crack': 'Password Test',
        'pen-network': 'Network Analysis',
        'qr-title': 'Telegram Bot for Security Tests',
        'qr-desc': 'Scan QR code to open security testing bot',
        'contact-title': 'Contact Me',
        'contact-ready': 'Ready to work now - Feel free to reach out',
        send: 'Send Message',
        rights: 'All Rights Reserved'
    }
};

const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        langToggle.innerHTML = currentLang === 'ar' ? '<i class="fas fa-globe"></i> EN' : '<i class="fas fa-globe"></i> AR';
        
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[currentLang][key]) {
                if (key === 'logo' || key === 'name') {
                    el.innerHTML = translations[currentLang][key];
                } else {
                    el.textContent = translations[currentLang][key];
                }
            }
        });
        
        charIndex = 0;
        textIndex = 0;
        isDeleting = false;
        typeEffect();
    });
}

// ========== عداد متحرك ==========
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

const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statProjects = document.getElementById('statProjects');
            const statYears = document.getElementById('statYears');
            const statClients = document.getElementById('statClients');
            if (statProjects) animateNumber(statProjects, 19);
            if (statYears) animateNumber(statYears, 3);
            if (statClients) animateNumber(statClients, 47);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.about-stats');
if (statsSection) observer.observe(statsSection);

// ========== زر تحميل PDF (يعمل فوراً) ==========
const downloadBtn = document.getElementById('downloadPDF');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // رابط مباشر لملف PDF - غير هذا الرابط إلى رابط ملفك الحقيقي
        const pdfUrl = 'https://anytourl.com/s/81830688496704564';
        window.open(pdfUrl, '_blank');
    });
}

// ========== QR Code ==========
const qrcodeDiv = document.getElementById('qrcode');
if (qrcodeDiv && typeof QRCode !== 'undefined') {
    new QRCode(qrcodeDiv, {
        text: 'https://t.me/band_idlebx_bot',
        width: 120,
        height: 120
    });
}

// ========== قسم اختبار الاختراق ==========
const terminalBody = document.getElementById('terminalBody');

function addTerminalLine(text) {
    if (!terminalBody) return;
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
    setTimeout(() => addTerminalLine('[EXPLOIT] Session opened - SAFE simulation'), 2400);
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

// ========== وضع مظلم/مضيء ==========
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// ========== قائمة التنقل للجوال ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== تأثير AOS ==========
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true
    });
}

// ========== جلب مشاريع GitHub ==========
async function fetchGitHubRepos() {
    const username = 'IDLEBX'; // غير هذا إلى اسم المستخدم الخاص بك في GitHub
    const repoContainer = document.getElementById('githubRepos');
    if (!repoContainer) return;
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('GitHub API error');
        const repos = await response.json();
        
        repoContainer.innerHTML = '';
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'github-card';
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'لا يوجد وصف متاح'}</p>
                <div class="github-stars">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</div>
                <a href="${repo.html_url}" target="_blank" class="github-link">عرض المشروع →</a>
            `;
            repoContainer.appendChild(card);
        });
    } catch (error) {
        repoContainer.innerHTML = '<div class="github-loading">فشل تحميل المشاريع من GitHub. تأكد من اسم المستخدم.</div>';
    }
}

fetchGitHubRepos();

// ========== إشعار تيلجرام عند إرسال النموذج ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contactName')?.value || '';
        const email = document.getElementById('contactEmail')?.value || '';
        const message = document.getElementById('contactMsg')?.value || '';
        
        // توكن البوت و ID المحادثة - ضع بياناتك الحقيقية هنا
        const botToken = '8692572711:AAEp43YeUHBQW_opqzpBZjnN6S5-UQyUKqM'; // غير هذا إلى توكن بوتك
        const chatId = '7240148750'; // غير هذا إلى معرف المحادثة الخاص بك
        
        const text = `🔔 *رسالة جديدة من موقع IDLEB X* 🔔\n\n👤 *الاسم:* ${name}\n📧 *البريد:* ${email}\n💬 *الرسالة:* ${message}`;
        
        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
            });
            
            const notifyDiv = document.getElementById('telegramNotification');
            if (notifyDiv) {
                if (response.ok) {
                    notifyDiv.style.display = 'block';
                    notifyDiv.style.color = '#00ff00';
                    notifyDiv.textContent = currentLang === 'ar' ? '✓ تم إرسال رسالتك! سأتواصل معك قريباً' : '✓ Message sent! I will contact you soon';
                    contactForm.reset();
                } else {
                    notifyDiv.style.display = 'block';
                    notifyDiv.style.color = '#ff0000';
                    notifyDiv.textContent = currentLang === 'ar' ? '✗ حدث خطأ، حاول مرة أخرى' : '✗ An error occurred, please try again';
                }
                setTimeout(() => { notifyDiv.style.display = 'none'; }, 5000);
            }
        } catch (error) {
            console.error('Telegram error:', error);
        }
    });
    }
