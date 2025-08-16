// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Paint Splash Canvas
class PaintSplash {
    constructor() {
        this.canvas = document.getElementById('paintCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.splashes = [];
        this.resize();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    createSplash(x, y, color = '#000') {
        const splash = {
            x: x,
            y: y,
            color: color,
            particles: [],
            life: 1
        };

        // Create particles for splash
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = Math.random() * 3 + 2;
            const particle = {
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                decay: Math.random() * 0.02 + 0.01
            };
            splash.particles.push(particle);
        }

        this.splashes.push(splash);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw splashes
        for (let i = this.splashes.length - 1; i >= 0; i--) {
            const splash = this.splashes[i];
            splash.life -= 0.01;

            if (splash.life <= 0) {
                this.splashes.splice(i, 1);
                continue;
            }

            // Update particles
            splash.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // Gravity
                particle.life -= particle.decay;

                // Draw particle
                if (particle.life > 0) {
                    this.ctx.save();
                    this.ctx.globalAlpha = particle.life;
                    this.ctx.fillStyle = splash.color;
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                }
            });
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize paint splash
const paintSplash = new PaintSplash();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// PDF Modal functionality
const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const closeBtn = document.querySelector('.close-btn');

function openPDFModal(pdfUrl) {
    pdfViewer.src = pdfUrl;
    pdfModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Create paint splash effect
    paintSplash.createSplash(window.innerWidth / 2, window.innerHeight / 2);
}

function closePDFModal() {
    pdfModal.style.display = 'none';
    pdfViewer.src = '';
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closePDFModal);
pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
        closePDFModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.style.display === 'block') {
        closePDFModal();
    }
});

// Load certificates from JSON
async function loadCertificates() {
    try {
        const response = await fetch('certificates.json');
        const certificates = await response.json();
        displayCertificates(certificates);
    } catch (error) {
        console.error('Error loading certificates:', error);
        // Fallback data
        const fallbackCertificates = [
            {
                title: "Sample Certificate",
                pdfUrl: "#",
                downloadUrl: "#",
                githubLink: "https://github.com/IRONalways17"
            }
        ];
        displayCertificates(fallbackCertificates);
    }
}

function displayCertificates(certificates) {
    const grid = document.getElementById('certificatesGrid');
    
    certificates.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'certificate-card loading';
        
        card.innerHTML = `
            <div class="certificate-content">
                <h3 class="certificate-title">${cert.title}</h3>
                <div class="certificate-actions">
                    <button class="btn view-btn" onclick="openPDFModal('${cert.pdfUrl}')">
                        <i class="fas fa-eye"></i> View PDF
                    </button>
                    <a href="${cert.downloadUrl}" class="btn download-btn" download>
                        <i class="fas fa-download"></i> Download
                    </a>
                    <a href="${cert.githubLink}" class="btn github-btn" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                </div>
            </div>
        `;

        // Add paint splash effect on hover
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            paintSplash.createSplash(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        });

        grid.appendChild(card);
        
        // Animate in
        setTimeout(() => {
            card.classList.remove('loading');
            card.classList.add('loaded');
        }, 100);
    });
}

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback data
        const fallbackProjects = [
            {
                name: "Quiz Master App v2 & v3",
                description: "Advanced quiz application with enhanced features and user experience.",
                githubLink: "https://github.com/IRONalways17"
            },
            {
                name: "Web-Based Games",
                description: "Collection of interactive web games built with modern technologies.",
                githubLink: "https://github.com/IRONalways17"
            },
            {
                name: "Video-Conference App",
                description: "Real-time video conferencing application with advanced features.",
                githubLink: "https://github.com/IRONalways17"
            },
            {
                name: "Donation-Collecting Web App",
                description: "Secure web application for collecting and managing donations.",
                githubLink: "https://github.com/IRONalways17"
            },
            {
                name: "AI Agentic + LLM Assistant",
                description: "Intelligent AI assistant powered by large language models.",
                githubLink: "https://github.com/IRONalways17"
            }
        ];
        displayProjects(fallbackProjects);
    }
}

function displayProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card loading';
        
        card.innerHTML = `
            <div class="project-content">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <a href="${project.githubLink}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        `;

        // Add paint splash effect on hover
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            paintSplash.createSplash(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        });

        grid.appendChild(card);
        
        // Staggered animation
        setTimeout(() => {
            card.classList.remove('loading');
            card.classList.add('loaded');
        }, index * 100);
    });
}

// GSAP Animations
function initAnimations() {
    // Header animation
    gsap.from('.name', {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.tagline', {
        duration: 1.2,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // Certificate cards animation
    gsap.utils.toArray('.certificate-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.9,
            ease: 'power2.out',
            delay: index * 0.1
        });
    });

    // Project cards animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.9,
            ease: 'power2.out',
            delay: index * 0.1
        });
    });

    // Tech items animation
    gsap.utils.toArray('.tech-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            ease: 'power2.out',
            delay: index * 0.1
        });
    });

    // Social links animation
    gsap.from('.social-link', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        y: 20,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.1
    });
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCertificates();
    loadProjects();
    initAnimations();
    initIntersectionObserver();
    
    // Add paint splash effect on page load
    setTimeout(() => {
        paintSplash.createSplash(window.innerWidth / 2, window.innerHeight / 2);
    }, 1000);
});

// Add paint splash effect on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollY > 0 && scrollY < documentHeight - windowHeight) {
            paintSplash.createSplash(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }
    }, 100);
});

// Add paint splash effect on click
document.addEventListener('click', (e) => {
    // Don't create splash for modal elements
    if (!e.target.closest('.pdf-modal') && !e.target.closest('.btn')) {
        paintSplash.createSplash(e.clientX, e.clientY);
    }
});

// Performance optimization: Throttle paint splash creation
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttled paint splash for scroll
const throttledPaintSplash = throttle((x, y) => {
    paintSplash.createSplash(x, y);
}, 100);
