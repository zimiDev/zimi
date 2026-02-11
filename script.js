     // ============================================
        // 1. LOADING SCREEN
        // ============================================
        window.addEventListener('load', () => {
            let progress = 0;
            const progressBar = document.getElementById('loadingProgress');
            const loadingScreen = document.getElementById('loadingScreen');
            
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress > 100) progress = 100;
                progressBar.style.width = progress + '%';
                
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                    }, 500);
                }
            }, 200);
        });

        // ============================================
        // 2. THEME SWITCHER
        // ============================================
        const themeToggle = document.getElementById('themeToggle');
        const switchIcon = document.querySelector('.switch-icon');
        const htmlElement = document.documentElement;
        const currentTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            let theme = htmlElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });

        function updateIcon(theme) {
            if(theme === 'light') {
                switchIcon.classList.remove('ri-moon-line');
                switchIcon.classList.add('ri-sun-line');
            } else {
                switchIcon.classList.remove('ri-sun-line');
                switchIcon.classList.add('ri-moon-line');
            }
        }

        // ============================================
        // 3. MOBILE MENU
        // ============================================
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            });
        });

        // ============================================
        // 4. CURSOR
        // ============================================
        const cursor = document.getElementById('cursor');
        
        if (window.matchMedia("(pointer: fine)").matches) {
            let mouseX = 0, mouseY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            });

            document.querySelectorAll('.hover-target').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursor.style.borderColor = 'var(--neon-pink)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.borderColor = 'var(--neon-blue)';
                });
            });
        } else {
            cursor.style.display = 'none';
        }

        // ============================================
        // 5. TYPING EFFECT
        // ============================================
        const textToType = "Software Engineer & AI Student";
        const typingEl = document.querySelector('.typing-text');
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < textToType.length) {
                typingEl.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1500);

        // ============================================
        // 6. COUNTER ANIMATION
        // ============================================
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        }

        const statNumbers = document.querySelectorAll('.stat-number');
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(num => animateCounter(num));
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if(document.querySelector('.hero-stats')) {
            heroObserver.observe(document.querySelector('.hero-stats'));
        }

        // ============================================
        // 7. SCROLL ANIMATIONS
        // ============================================
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    const bars = entry.target.querySelectorAll('.progress-bar-fill');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // ============================================
        // 8. SMOOTH SCROLL
        // ============================================
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

        // ============================================
        // 10. ACTIVE NAV LINK ON SCROLL
        // ============================================
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = 'var(--text-main)';
                link.style.textShadow = 'none';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.color = 'var(--neon-pink)';
                    link.style.textShadow = '0 0 8px var(--neon-pink)';
                }
            });
        });