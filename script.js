document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const backgroundSections = document.querySelectorAll('.background-section');
    const header = document.querySelector('header');
    const mapImage = document.querySelector('.map-img');
    const boxes = document.querySelectorAll('.text-box, .quote-box, .image-box');
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '▼';
    document.body.appendChild(scrollIndicator);

    // Add parallax effect to header and backgrounds
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Update header parallax
        header.style.backgroundPositionY = -(scrolled * 0.5) + 'px';

        // Update background sections with enhanced parallax
        backgroundSections.forEach((bg, index) => {
            const sectionTop = sections[index]?.offsetTop || 0;
            const sectionBottom = sectionTop + (sections[index]?.offsetHeight || 0);

            if (scrolled >= sectionTop - windowHeight * 0.5 &&
                scrolled <= sectionBottom + windowHeight * 0.5) {
                bg.classList.add('active');
                bg.style.setProperty('--scroll-y', `${scrolled * 0.2}px`);
            } else {
                bg.classList.remove('active');
            }
        });

        // Hide scroll indicator when scrolled
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }

        if (!ticking) {
            window.requestAnimationFrame(updateBoxes);
            ticking = true;
        }
    });

    // Add map image interaction
    if (mapImage) {
        mapImage.addEventListener('mouseenter', () => {
            mapImage.style.transform = 'scale(1.05)';
        });

        mapImage.addEventListener('mouseleave', () => {
            mapImage.style.transform = 'scale(1)';
        });
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate(0deg)';

                // Add glitch effect to headings
                const heading = entry.target.querySelector('h2');
                if (heading) {
                    heading.classList.add('glitch');
                    setTimeout(() => {
                        heading.classList.remove('glitch');
                    }, 1000);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Add initial styles and observe sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) rotate(2deg)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Update mouse position for background effect
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Enhanced hover effects
    const textBoxes = document.querySelectorAll('.text-box');
    textBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'scale(1.02) rotate(0.5deg)';
        });
        box.addEventListener('mouseleave', () => {
            box.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animate icons on hover
    const icons = document.querySelectorAll('.data-icon, .impact-icon, .capacity-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.textShadow = '0 0 10px var(--secondary-color)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.textShadow = 'none';
        });
    });

    // Enhanced click effect
    document.addEventListener('click', (e) => {
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.style.left = e.clientX + 'px';
        clickEffect.style.top = e.clientY + 'px';
        document.body.appendChild(clickEffect);

        // Add multiple particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.transform = `rotate(${i * 45}deg)`;
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }

        setTimeout(() => {
            clickEffect.remove();
        }, 1000);
    });

    // Add keyboard interaction
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowUp') {
            window.scrollBy({
                top: -window.innerHeight,
                behavior: 'smooth'
            });
        }
    });

    function updateBoxes() {
        boxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            const boxBottom = box.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (boxTop < windowHeight && boxBottom > 0) {
                box.classList.add('visible');
                box.classList.remove('fade-out');

                // Add subtle animation when box comes into view
                box.style.animation = 'scroll-in 1s ease-out forwards, subtle-float 4s ease-in-out infinite';
            } else {
                if (window.scrollY < lastScrollY) {
                    box.classList.add('fade-out');
                    box.classList.remove('visible');
                }
            }
        });
        lastScrollY = window.scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateBoxes);
            ticking = true;
        }
    });

    // Initial check
    updateBoxes();

    // Add matrix rain effect
    function createMatrixRain() {
        const matrixRain = document.createElement('canvas');
        matrixRain.className = 'matrix-rain';
        matrixRain.width = window.innerWidth;
        matrixRain.height = window.innerHeight;
        document.body.appendChild(matrixRain);

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const columns = Math.floor(window.innerWidth / 20);
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            const ctx = matrixRain.getContext('2d');
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, matrixRain.width, matrixRain.height);

            ctx.fillStyle = '#0F0';
            ctx.font = '10px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > matrixRain.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            matrixRain.width = window.innerWidth;
            matrixRain.height = window.innerHeight;
        });

        setInterval(draw, 33);
    }

    // Add glitch effect to headings
    function addGlitchEffect() {
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.classList.add('glitch-text');
        });
    }

    // Add holographic effect to sections
    function addHolographicEffect() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('holographic', 'digital-noise', 'scan-lines');
        });
    }

    // Add distortion effect to text boxes
    function addDistortionEffect() {
        const textBoxes = document.querySelectorAll('.text-box');
        textBoxes.forEach(box => {
            box.classList.add('distortion');
        });
    }

    // Add neon pulse to important elements
    function addNeonPulse() {
        const importantElements = document.querySelectorAll('.data-point, .impact-item, .capacity-icon');
        importantElements.forEach(element => {
            element.classList.add('neon-pulse');
        });
    }

    // Enhanced scroll animations
    function enhanceScrollAnimations() {
        // Set initial styles for all sections
        document.querySelectorAll('section').forEach(section => {
            const heading = section.querySelector('h2');
            if (heading) {
                heading.style.opacity = '1';
                heading.style.transform = 'translateY(0)';
            }

            // Handle small text boxes with two texts
            section.querySelectorAll('.text-box.small').forEach(box => {
                const texts = box.querySelectorAll('p');
                if (texts.length >= 2) {
                    // Show first text immediately
                    texts[0].style.opacity = '1';
                    texts[0].style.transform = 'translateY(0)';

                    // Hide second text initially
                    texts[1].style.opacity = '0';
                    texts[1].style.transform = 'translateY(50px)';
                    texts[1].style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }
            });

            // Hide other content initially
            section.querySelectorAll('p:not(.text-box.small p), .quote-box').forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(50px)';
                content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            });
        });

        // Add scroll event listener for immediate response
        window.addEventListener('scroll', () => {
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                const scrollProgress = 1 - (sectionTop / windowHeight);

                // Show second text in small boxes when scrolled halfway
                if (scrollProgress > 0.5) {
                    section.querySelectorAll('.text-box.small').forEach(box => {
                        const texts = box.querySelectorAll('p');
                        if (texts.length >= 2) {
                            texts[1].style.opacity = '1';
                            texts[1].style.transform = 'translateY(0)';
                        }
                    });
                }

                // Show other content when scrolled into view
                if (scrollProgress > 0.3) {
                    section.querySelectorAll('p:not(.text-box.small p), .quote-box').forEach(content => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    });

                    section.classList.add('holographic-scan');
                }
            });
        }, { passive: true });
    }

    // Initialize effects
    createMatrixRain();
    addGlitchEffect();
    addHolographicEffect();
    addDistortionEffect();
    addNeonPulse();
    enhanceScrollAnimations();
}); 