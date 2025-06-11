// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on links
        if (this.navMenu) {
            this.navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    this.closeMobileMenu();
                }
            });
        }

        // Handle scroll for navbar background
        window.addEventListener('scroll', () => this.handleScroll());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.style.background = this.getThemeAwareBackground(0.98);
        } else {
            this.navbar.style.background = this.getThemeAwareBackground(0.95);
        }
    }

    getThemeAwareBackground(opacity) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark 
            ? `rgba(17, 24, 39, ${opacity})` 
            : `rgba(255, 255, 255, ${opacity})`;
    }
}

// Particles Configuration
class ParticlesManager {
    constructor() {
        this.init();
    }

    init() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#6366f1'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#6366f1',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.initAOS();
        this.animateSkillBars();
        this.initFloatingCards();
    }

    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100
            });
        }
    }

    animateSkillBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const animateBar = (bar) => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => animateBar(entry.target), 500);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    initFloatingCards() {
        const floatingCards = document.querySelectorAll('[data-tilt]');
        
        floatingCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }
}

// Services Modal Manager
class ModalManager {
    constructor() {
        this.modal = document.getElementById('orderModal');
        this.form = document.getElementById('orderForm');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Handle form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    openModal(serviceName, price) {
        if (!this.modal) return;

        document.getElementById('selectedService').textContent = serviceName;
        document.getElementById('selectedPrice').textContent = price;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = this.modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    closeModal() {
        if (!this.modal) return;

        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        if (this.form) {
            this.form.reset();
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!this.validateForm(data)) {
            return;
        }

        // Create WhatsApp message
        const message = this.createWhatsAppMessage(data);
        
        // Open WhatsApp
        const whatsappUrl = `https://wa.me/201208938661?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Close modal
        this.closeModal();
        
        // Show success message
        this.showSuccessMessage();
    }

    validateForm(data) {
        const requiredFields = ['clientName', 'clientAge', 'projectDetails'];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showError(`يرجى ملء جميع الحقول المطلوبة`);
                return false;
            }
        }
        
        if (data.clientAge < 18 || data.clientAge > 100) {
            this.showError('يرجى إدخال عمر صحيح');
            return false;
        }
        
        return true;
    }

    createWhatsAppMessage(data) {
        const serviceName = document.getElementById('selectedService').textContent;
        const servicePrice = document.getElementById('selectedPrice').textContent;
        
        return `
🌟 طلب خدمة جديد 🌟

👤 الاسم: ${data.clientName}
🎂 العمر: ${data.clientAge}
💼 الخدمة المطلوبة: ${serviceName}
💰 السعر: ${servicePrice} جنيه

📋 تفاصيل المشروع:
${data.projectDetails}

⏰ الجدول الزمني: ${data.timeline || 'شهر واحد'}
💵 الميزانية: ${data.budget || 'حسب السعر المحدد'}

أتطلع للعمل معك! 🚀
        `.trim();
    }

    showError(message) {
        // Create and show error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showSuccessMessage() {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = 'تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Smooth Scrolling Manager
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // Handle smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Monitor performance
        this.monitorPerformance();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    monitorPerformance() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }
        });
    }
}

// Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.handleKeyboardNavigation();
        this.addAriaLabels();
        this.manageFocus();
    }

    handleKeyboardNavigation() {
        // Handle tab navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    addAriaLabels() {
        // Add aria labels to interactive elements
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim() || button.title || 'Button';
                button.setAttribute('aria-label', text);
            }
        });
    }

    manageFocus() {
        // Manage focus for modal
        const modal = document.getElementById('orderModal');
        if (modal) {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    this.trapFocus(e, modal);
                }
            });
        }
    }

    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
}

// Global Functions
function openOrderModal(serviceName, price) {
    if (window.modalManager) {
        window.modalManager.openModal(serviceName, price);
    }
}

function closeOrderModal() {
    if (window.modalManager) {
        window.modalManager.closeModal();
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    window.themeManager = new ThemeManager();
    window.navigationManager = new NavigationManager();
    window.particlesManager = new ParticlesManager();
    window.animationManager = new AnimationManager();
    window.modalManager = new ModalManager();
    window.smoothScrollManager = new SmoothScrollManager();
    window.performanceMonitor = new PerformanceMonitor();
    window.accessibilityManager = new AccessibilityManager();

    // Add loading animation
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 1000);
    }

    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .card, .service-card, .project-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(99, 102, 241, 0.8)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(99, 102, 241, 0.5)';
        });
    });

    console.log('🚀 Farid Portfolio Website Loaded Successfully!');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }

    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.3s ease;
    }

    .loader::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .error-notification,
    .success-notification {
        animation: slideInRight 0.3s ease-out;
    }

    @media (max-width: 768px) {
        .custom-cursor {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);
// 🔐 حماية من التلاعب في الكونسول
(function() {
  const preventConsoleHack = () => {
    const devtools = /./;
    devtools.toString = function() {
      this.opened = true;
      throw "تم اكتشاف Developer Tools، سيتم إغلاق الصفحة!";
    };
    console.log('%c', devtools);
  };

  // 🔒 حماية من اختراق DOM / console
  const blockInspectTools = () => {
    document.addEventListener('keydown', function(e) {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        alert("🚫 تم حظر هذا الاختصار لحماية الموقع.");
      }
    });

    // Disable right click
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
      alert("❗ please متعملش كده تاني");
    });

    // Detect devtools open
    let devToolsOpened = false;
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      if (widthThreshold || heightThreshold) {
        if (!devToolsOpened) {
          devToolsOpened = true;
          alert("❗ تم اكتشاف أدوات المطور، سيتم إغلاق الصفحة");
          window.close(); // إغلاق الصفحة إن أمكن
        }
      } else {
        devToolsOpened = false;
      }
    };
    setInterval(detectDevTools, 1000);
  };

  preventConsoleHack();
  blockInspectTools();
})();
