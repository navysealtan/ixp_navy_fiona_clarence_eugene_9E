// ==================== NAVIGATION & MENU ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== ACTIVE NAV LINK ==================== 
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call on page load
setActiveNavLink();

// ==================== SCROLL FUNCTIONS ==================== 
function scrollToContent() {
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function navigateTo(page) {
    window.location.href = page;
}

// ==================== ANIMATION ON SCROLL ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.feature-card, .content-card, .team-member, .source-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ==================== KINEMATICS CALCULATOR ==================== 
function calculateMotion() {
    const v0 = parseFloat(document.getElementById('v0')?.value || 0);
    const acc = parseFloat(document.getElementById('acc')?.value || 0);
    const time = parseFloat(document.getElementById('time')?.value || 0);

    // Kinematic equations
    const finalVelocity = v0 + acc * time;
    const displacement = v0 * time + 0.5 * acc * time * time;

    // Display results
    const resultV = document.getElementById('result-v');
    const resultS = document.getElementById('result-s');

    if (resultV) resultV.textContent = finalVelocity.toFixed(2);
    if (resultS) resultS.textContent = displacement.toFixed(2);

    // Visual feedback
    showCalculationFeedback('Calculation completed!');
}

// ==================== ENERGY CALCULATOR ==================== 
function calculateEnergy() {
    const mass = parseFloat(document.getElementById('mass')?.value || 0);
    const height = parseFloat(document.getElementById('height')?.value || 0);
    const velocity = parseFloat(document.getElementById('velocity')?.value || 0);

    const g = 9.8; // gravitational acceleration

    // Energy calculations
    const potentialEnergy = mass * g * height;
    const kineticEnergy = 0.5 * mass * velocity * velocity;
    const totalEnergy = potentialEnergy + kineticEnergy;

    // Display results
    const resultPE = document.getElementById('result-pe');
    const resultKE = document.getElementById('result-ke');
    const resultTotal = document.getElementById('result-total');

    if (resultPE) resultPE.textContent = potentialEnergy.toFixed(2);
    if (resultKE) resultKE.textContent = kineticEnergy.toFixed(2);
    if (resultTotal) resultTotal.textContent = totalEnergy.toFixed(2);

    showCalculationFeedback('Energy calculation complete!');
}

// ==================== SIMPLE HARMONIC MOTION SIMULATION ==================== 
let shmAnimationId = null;
let isSHMRunning = false;

function toggleSHM() {
    if (isSHMRunning) {
        stopSHM();
    } else {
        startSHM();
    }
}

function startSHM() {
    isSHMRunning = true;
    const amplitude = parseFloat(document.getElementById('shm-amplitude')?.value || 5);
    const frequency = parseFloat(document.getElementById('shm-frequency')?.value || 2);
    const mass = document.getElementById('mass');
    
    if (!mass) return;

    let time = 0;
    const dt = 0.05; // time step
    const baseX = 150; // base position of mass

    function animateSHM() {
        if (!isSHMRunning) return;

        // Simple harmonic motion equation: x = A * sin(2πft)
        const displacement = amplitude * Math.sin(2 * Math.PI * frequency * time);
        const newX = baseX + displacement;

        mass.setAttribute('x', newX);

        time += dt;
        shmAnimationId = requestAnimationFrame(animateSHM);
    }

    animateSHM();
}

function stopSHM() {
    isSHMRunning = false;
    if (shmAnimationId) {
        cancelAnimationFrame(shmAnimationId);
    }
    const mass = document.getElementById('mass');
    if (mass) {
        mass.setAttribute('x', 150);
    }
}

// ==================== CALCULATION FEEDBACK ==================== 
function showCalculationFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// ==================== SMOOTH SCROLL BEHAVIOR ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== EQUATION HIGHLIGHTING ==================== 
function highlightEquations() {
    const equations = document.querySelectorAll('.equation, .equation-text');
    equations.forEach(eq => {
        eq.style.transition = 'all 0.3s ease';
        eq.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        });
        eq.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

highlightEquations();

// ==================== FORM VALIDATION ==================== 
function validateCalculatorInputs() {
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e74c3c';
            showCalculationFeedback('Please enter a valid number');
        });

        input.addEventListener('change', function() {
            if (this.value && !isNaN(this.value)) {
                this.style.borderColor = '#667eea';
            }
        });
    });
}

validateCalculatorInputs();

// ==================== PAGE LOAD ANIMATION ==================== 
window.addEventListener('load', () => {
    document.querySelectorAll('.feature-card, .content-card, .team-member').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = `slideUp 0.6s ease ${index * 0.1}s forwards`;
    });
});

// ==================== PARALLAX EFFECT ==================== 
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ==================== KEYBOARD NAVIGATION ==================== 
document.addEventListener('keydown', (e) => {
    // Press '?' for quick help
    if (e.key === '?') {
        console.log('Navigation: Use arrow keys to navigate between pages. Press ? anytime for this help.');
    }

    // Arrow key navigation between content pages
    if (e.key === 'ArrowRight') {
        const nextLink = document.querySelector('.nav-btn:last-of-type');
        if (nextLink) nextLink.click();
    }
    if (e.key === 'ArrowLeft') {
        const prevLink = document.querySelector('.nav-btn:first-of-type');
        if (prevLink) prevLink.click();
    }
});

// ==================== DARK MODE TOGGLE (Optional) ==================== 
// Uncomment to enable dark mode toggle
/*
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
*/

// ==================== ACCESSIBILITY: FOCUS MANAGEMENT ==================== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.style.outline = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focused = document.activeElement;
        if (focused) {
            focused.style.outline = '2px solid #667eea';
            focused.style.outlineOffset = '2px';
        }
    }
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 
// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== CONSOLE WELCOME MESSAGE ==================== 
console.log('%c⚛️ Welcome to AP Physics E-Learning Hub!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cPowered by HTML5, CSS3, and JavaScript', 'font-size: 12px; color: #764ba2;');
console.log('%cMade with ❤️ by Team: Eugene, Fiona, Clarence, Navy', 'font-size: 12px; color: #f093fb;');