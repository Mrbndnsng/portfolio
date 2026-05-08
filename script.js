
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileToggle.classList.toggle('active');
    });
}


const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


const navLinkElements = document.querySelectorAll('.nav-link');

navLinkElements.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const sectionId = targetId.substring(1);
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                if (mobileToggle) mobileToggle.classList.remove('active');
            }
            
            const headerHeight = header ? header.offsetHeight : 70;
            let offset = headerHeight;
            if (sectionId === 'home') {
                offset = 0;
            }
            
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            history.pushState(null, null, `#${sectionId}`);
        }
    });
});


function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const headerHeight = header ? header.offsetHeight : 70;
    const scrollPos = window.scrollY + headerHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            navLinkElements.forEach(link => {
                const href = link.getAttribute('href');
                const linkId = href ? href.substring(1) : '';
                if (linkId === sectionId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}


function isInViewport(el, offset = 100) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight - offset && rect.bottom >= offset;
}

function checkAndAnimate() {
    const elements = [
        ...document.querySelectorAll('.fade-up'),
        ...document.querySelectorAll('.skill-card'),
        ...document.querySelectorAll('.project-card-link'),
        ...document.querySelectorAll('.about-grid > *'),
        ...document.querySelectorAll('.contact-wrapper > *'),
        ...document.querySelectorAll('.home-content > *')
    ];
    
    elements.forEach(el => {
        if (isInViewport(el, 80)) {
            el.classList.add('animate-in');
        } else {
            el.classList.remove('animate-in');
        }
    });
}


function handleInitialHash() {
    if (window.location.hash && window.location.hash !== '#') {
        setTimeout(() => {
            const sectionId = window.location.hash.substring(1);
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 70;
                let offset = headerHeight;
                if (sectionId === 'home') {
                    offset = 0;
                }
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}


window.addEventListener('load', () => {
    checkAndAnimate();
    updateActiveNavLink();
    handleInitialHash();
});

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(() => {
        checkAndAnimate();
        updateActiveNavLink();
    });
});

window.addEventListener('resize', () => {
    checkAndAnimate();
    updateActiveNavLink();
});


const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            formFeedback.textContent = 'All fields are required.';
            formFeedback.style.color = '#dc2626';
            setTimeout(() => {
                formFeedback.textContent = '';
            }, 3000);
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            formFeedback.textContent = 'Enter a valid email address.';
            formFeedback.style.color = '#dc2626';
            setTimeout(() => {
                formFeedback.textContent = '';
            }, 3000);
            return;
        }
        
        formFeedback.textContent = `Thanks ${name}, your message has been sent.`;
        formFeedback.style.color = '#10b981';
        contactForm.reset();
        setTimeout(() => {
            formFeedback.textContent = '';
        }, 3000);
    });
}

const contactItems = document.querySelectorAll('.contact-item-link');
contactItems.forEach(item => {
    item.addEventListener('click', function() {
        const contactDiv = this.querySelector('.contact-item');
        if (contactDiv) {
            contactDiv.style.transition = 'all 0.05s ease';
            contactDiv.style.transform = 'scale(0.98)';
            setTimeout(() => {
                contactDiv.style.transform = '';
            }, 100);
        }
    });
});


console.log('Portfolio loaded — Marben Densing');
console.log('Navigation links:', navLinkElements.length);
console.log('Sections found:', document.querySelectorAll('section').length);